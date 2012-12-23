require(['require'], function(require)
{
  var AppSingleton = (function()
  {
    function initialize()
    {
      require(['config/config'], function(configuration)
      {
        window.App.config = configuration
      })
    }

    return {
      init: initialize
    }
  }())


  window.App = window.App || AppSingleton
  window.App.init()

})
