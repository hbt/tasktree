/*global module:false*/
module.exports = function(grunt)
{
  grunt.loadTasks('./tasks/')

  // Project configuration.
  grunt.initConfig({
    lint:  {
      files: ['app/web/**/*.js']
    },
    watch: {
      files: ['app/web/**/*.js'],
      tasks: 'update-version-debug'
    }
  });
};
