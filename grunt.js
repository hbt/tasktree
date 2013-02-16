/*global module:false*/
module.exports = function(grunt)
{
  grunt.loadTasks('./tasks/')
  grunt.loadTasks('./tasks/coverage')


  // Project configuration.
  grunt.initConfig({
    coverage: {
      dirs: ['app/server/lib', 'app/web/assets/js/lib', 'app/web/assets/js/modules']
    }
  });
};
