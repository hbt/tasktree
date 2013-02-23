module.exports = function(grunt)
{
  var _ = require('underscore')
  var fs = require('fs')
  var exec = require('child_process').exec;
  var util = require('util')
  var l = util.log
  var f = require('file')
  var path = require('path')
  var flow = null

  var Instrumentation = (function()
  {

    /**
     * copies original code as _bak
     * @param path
     */
    function backupDirectory(path)
    {
      var bakpath = path + '_bak'
      // copy dir
      if(!fs.existsSync(bakpath))
      {
        flow.sync(exec('cp -R ' + path + ' ' + bakpath, flow.callback()))
      }
    }


    function instrumentDirectory(dir)
    {
      if(!fs.existsSync(dir))
      {
        grunt.fatal(dir + ' does not exist')
        return false;
      }

      backupDirectory(dir)
      f.walkSync(dir, function(dirname, dirs, files)
      {
        _.each(files, function(filename)
        {
          // only instrument js files
          if(path.extname(filename) !== '.js')
          {
            return;
          }

          // we do different things for backend JS vs frontend JS
          var isBackend = dir.indexOf('app/server') !== -1
          var isFrontend = dir.indexOf('app/web/assets') !== -1

          // do not instrument test files
          if(isFrontend && dirname.indexOf('/tests') !== -1)
          {
            return;
          }

          // only instrument if file has not been instrumented already
          var filepath = dirname + '/' + filename
          var code = fs.readFileSync(filepath, 'utf8')
          if(code.indexOf('__coverage__') === -1)
          {
            var instrumented = flow.sync(exec('istanbul instrument ' + filepath, flow.callback()))

            if(isBackend)
            {
              // replace __coverage__ to point to global reference to dump all files' coverage at the same time
              instrumented = instrumented.replace('__coverage__ = {}', '__coverage__ = GLOBAL.coverage')
            }

            fs.writeFileSync(filepath, instrumented, 'utf8')
          }
        })
      })
    }


    /**
     * removes instrumented code and restores original code
     * @param dir
     */
    function cleanInstrumentedDirectory(dir)
    {
      var bakdir = dir + '_bak'
      if(fs.existsSync(bakdir))
      {
        if(fs.existsSync(dir))
        {
          flow.sync(exec('rm -rf ' + dir, flow.callback()))
          fs.renameSync(bakdir, dir)
        }
      }
    }

    return {
      instrumentDirectory:        instrumentDirectory,
      cleanInstrumentedDirectory: cleanInstrumentedDirectory
    }

  })()


  grunt.registerHelper('coverage:instrument', function(directories, syncflow)
  {
    flow = syncflow
    _.each(directories, function(directory)
    {
      Instrumentation.instrumentDirectory(directory)
      l('instrumented ' + directory)
    })
  })


  grunt.registerHelper('coverage:clean-instrumented', function(directories, syncflow)
  {
    flow = syncflow
    _.each(directories, function(directory)
    {
      Instrumentation.cleanInstrumentedDirectory(directory)
    })
  })

  // TODO(hbt) add desc
  // TODO(hbt) Refactor (low):
  grunt.registerTask('coverage', 'instruments files +', function()
  {
    var asyncblock = require('asyncblock');

    var done = this.async()

    asyncblock(function(syncflow)
    {
      flow = syncflow

      flow.sync(exec('./tasks/stop-server', flow.callback()))

      grunt.helper('coverage:instrument', grunt.config('coverage').dirs, syncflow)

      // TODO(hbt) Feature: get this bit working every time and without interrupting the process
      exec('./tasks/restart-server -ss', function()
      {
        // run tests in the browser
        var config = require('../../app/server/config/config').config
        var open = require('open');
        open(config.testsUrl, function()
        {
          done()
        });
      })
    });
  })

}