/*global module:false*/
module.exports = function(grunt)
{
  grunt.loadTasks('./tasks/')

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: ['app/web/**/*.js', 'app/web/**/*.html', 'app/web/**/*.hbs'],
      tasks: 'debug:update-version'
    }
  });
};
