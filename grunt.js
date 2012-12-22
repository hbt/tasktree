/*global module:false*/
module.exports = function(grunt)
{

  grunt.registerTask('update-version-debug', 'Updates a file with the timestamp which in turn reloads the web ' +
    'browser when files change', function()
  {
    var versionFilepath = __dirname + '/app/web/debug-version.txt'

    var fs = require('fs');
    fs.writeFile(versionFilepath, (+new Date()), function(err)
    {
      if(err)
      {
        throw err
      }
    });
  });


  // Project configuration.
  grunt.initConfig({
    lint:   {
      files: ['grunt.js', 'app/web/**/*.js']
    },
    watch:  {
      files: '<config:lint.files>',
      tasks: 'update-version-debug'
    },
    jshint: {
      options: {
        curly:   true,
        eqeqeq:  true,
        immed:   true,
        latedef: true,
        newcap:  true,
        noarg:   true,
        sub:     true,
        undef:   true,
        boss:    true,
        eqnull:  true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    }
  });
};
