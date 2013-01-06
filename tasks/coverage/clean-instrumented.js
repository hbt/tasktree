module.exports = function(grunt)
{

  // TODO(hbt) add desc
  grunt.registerTask('clean-instrumented', 'instruments files +', function()
  {
    var asyncblock = require('asyncblock');

    var done = this.async()

    asyncblock(function(syncflow)
    {
      grunt.helper('coverage:clean-instrumented', grunt.config('coverage').dirs, syncflow)

      done()
    });
  })
}