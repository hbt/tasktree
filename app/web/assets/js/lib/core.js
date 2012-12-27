define(['require'], function(require)
{
  var AppSingleton = (function()
  {
    var CustomEnvironment = {

      /**
       * adds links + shortcuts for debugging purposes in dev mode
       * @param environmentName
       */
      configure: function(environmentName)
      {
        if(environmentName === 'dev')
        {
          // enable auto-reload when files change in dev mode
          require(['lib/utils/debug/reload'], function(ReloadUtils)
          {
            ReloadUtils.init()
          })


          // add shortcuts to run tests
          $(document).ready(function()
          {
            var div = document.createElement('div')
            div.innerHTML = '<a href="#tests">Run tests</a>'
            div.id = 'mocha'
            document.body.appendChild(div)
          })
        }
      }
    }

    function initialize(callback)
    {
      require(['config/config', 'lib/router'], function(configuration, Router)
      {
        window.App.config = configuration
        CustomEnvironment.configure(window.App.config.envName)

        window.App.Router = window.App.Router || new Router()

        callback()
      });
    }

    return {
      init: initialize
    }
  }())


  var App = window.App || AppSingleton
  window.App = App

  return App
})
