define(['require'], function(require)
{
  return (function()
  {
    var exports = {}

    var Tests = {
      init: function()
      {

      }
    }

    exports.init = function()
    {
      require(['utils/debug/reload'], function(Reloader)
      {
        Reloader.init()
        Tests.init()
      })
    }
    return exports
  })()
})