/*global module:false*/
module.exports = function(grunt)
{
  grunt.loadTasks('./tasks/')
  grunt.loadTasks('./tasks/coverage')


  // Project configuration.
  grunt.initConfig({
    coverage: {
      dirs: ['app/server/lib', 'app/web/assets/js/collections', 'app/web/assets/js/models', 'app/web/assets/js/mixins',
        'app/web/assets/js/services', 'app/web/assets/js/view-model', 'app/web/assets/js/core'
      ]
    }
  });
};
