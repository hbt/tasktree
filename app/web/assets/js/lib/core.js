define(['require'], function(require)
{
  var AppSingleton = (function()
  {
    function initialize(callback)
    {
      require(['config/config'], function(configuration)
      {
        window.App.config = configuration
        callback()
      })
    }

    return {
      init: initialize
    }
  }())


  var App = window.App || AppSingleton
  window.App = App

  return App
})
