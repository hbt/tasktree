/*global module:false*/
module.exports = function(grunt)
{
  grunt.loadTasks('./tasks/')
  grunt.loadTasks('./tasks/coverage')
  grunt.loadNpmTasks('grunt-reload');


  // Project configuration.
  grunt.initConfig({
    watch:    {
      files: ['app/web/**/*.js', 'app/web/**/*.html', 'app/web/**/*.hbs', 'app/server/**/*.js'],
      tasks: 'debug:update-version reload'
    },
    coverage: {
      dirs: ['app/server/lib', 'app/web/assets/js/lib', 'app/web/assets/js/modules']
    },
    reload:   {
      liveReload: {},
      port:       35729
    },

  });


  /*
   Compiles the app with non-optimized build settings, places the build artifacts in the dist directory, and watches for file changes.
   Enter the following command at the command line to execute this build task:
   grunt dev
   */
  grunt.registerTask('dev', [
    'reload',
    'watch'
  ]);

};
