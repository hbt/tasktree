/*global module:false*/
module.exports = function(grunt)
{
  grunt.loadTasks('./tasks/')

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: ['app/web/**/*.js'],
      tasks: 'debug:update-version'
    }
  });
};
