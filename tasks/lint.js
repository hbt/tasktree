module.exports = function(grunt)
{
  var _ = require('underscore')

  var JSHintConfig = {

    /**
     * returns jshint configuration as JSON
     * @returns {{options: *, globals: *}}
     */
    getJSON: function()
    {
      var json = JSON.parse(JSHintConfig.cleanupJSON(JSHintConfig.readFile()))
      var globals = json.globals;
      delete json['globals']

      return {options: json, 'globals': globals}
    },

    /**
     * cleans up JSON by removing comments so it is parsable
     * @param json
     * @returns {string}
     */
    cleanupJSON: function(json)
    {
      return _.map(json.split('\n'),function(line)
      {
        return line.indexOf('//') === -1 ? line : ''
      }).join('\n')
    },


    /**
     * reads hintrc file
     * @returns string
     */
    readFile: function()
    {
      // TODO(hbt) Refactor (low): use path + resolve
      return grunt.file.read(__dirname + '/../config/hintrc.json')
    }
  }

  /**
   * limited to git
   */
  var VersionControl = {

    /**
     * returns list of modified files in git status
     * @param callback
     */
    getChangedFiles: function(callback)
    {
      var exec = require('child_process').exec;

      exec('git status --porcelain', '', function(error, stdout, stderr)
      {
        if(error)
        {
          grunt.fatal(stderr)
        }

        var files = stdout.split('\n')

        files = _.chain(files)
          .map(function(file)
          {
            // skip deleted
            var status = file.trim().split(' ').shift()
            if(status === 'D')
            {
              return;
            }

            // TODO(hbt) Refactor (low): move this up -- should not be in the loop
            var path = require('path')
            var filename = file.trim().split(' ').pop()

            var isJavascriptFile = filename &&  path.extname(filename) === '.js'
            return (isJavascriptFile && filename.indexOf('.template.js') === -1) ? path.normalize(__dirname + '/../' + filename) : null
          })
          .select(function(file)
          {
            return file
          })
          .value()

        callback(files)
      })
    }
  }

  grunt.registerTask('lint', 'runs lint on files in git status', function()
  {
    var config = JSHintConfig.getJSON()


    var done = this.async()
    VersionControl.getChangedFiles(function(changedFiles)
    {
      _.each(changedFiles, function(file)
      {
        grunt.helper('lint', grunt.file.read(file), config.options, config.globals, file);
      })

      if(grunt.fail.errorcount > 1)
      {
        grunt.fatal('Not lint free')
      }

      done()
    })
  })

}
