module.exports = function(grunt)
{
  grunt.registerTask('debug:update-version', 'updates debug-version.txt with a new timestamp to trigger a browser ' +
    'reload when making file changes', function()
  {

    var versionFilepath = __dirname + '/../app/web/debug-version.txt'

    var fs = require('fs')
    var done = this.async()

    fs.writeFile(versionFilepath, (+new Date()), function(err)
    {
      if(err)
      {
        grunt.fatal(err)
      }
      done()
    });
  })


};
