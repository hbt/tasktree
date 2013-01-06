/*global module:false*/
module.exports = function(grunt)
{
  grunt.loadTasks('./tasks/')
  grunt.loadTasks('./tasks/coverage')

  // Project configuration.
  grunt.initConfig({
    watch:    {
      files: ['app/web/**/*.js', 'app/web/**/*.html', 'app/web/**/*.hbs', 'app/server/**/*.js'],
      tasks: 'debug:update-version'
    },
    coverage: {
      dirs: ['app/server/lib', 'app/web/assets/js/lib', 'app/web/assets/js/modules']
    }
  });
};
