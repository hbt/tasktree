module.exports = function(grunt)
{
  var _ = require('underscore')

  var JSHintConfig = {
    getJSON: function()
    {
      var json = JSON.parse(JSHintConfig.cleanupJSON(JSHintConfig.readFile()))
      var globals = json.globals;
      delete json['globals']

      return {options: json, 'globals': globals}
    },

    cleanupJSON: function(json)
    {
      return _.map(json.split('\n'),function(line)
      {
        return line.indexOf('//') === -1 ? line : ''
      }).join('\n')
    },

    readFile: function()
    {
      return grunt.file.read(__dirname + '/../config/hintrc.json')
    }
  }

  /**
   * limited to git
   */
  var VersionControl = {

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
            var filename = file.trim().split(' ')[1]
            return (filename && filename.indexOf('.js') !== -1 && filename.indexOf('.json') === -1) ? __dirname + '/../' + filename : null
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

      done()
    })
  })

}