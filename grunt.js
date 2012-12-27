/*global module:false*/
module.exports = function(grunt)
{
  grunt.loadTasks('./tasks/')

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: ['app/web/**/*.js', 'app/web/**/*.html'],
      tasks: 'debug:update-version'
    }
  });
};
