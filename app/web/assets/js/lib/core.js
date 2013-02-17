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
//          require(['lib/utils/debug/reload'], function(ReloadUtils)
//          {
//            ReloadUtils.init()
//          })


          // add shortcuts to run tests
          $(document).ready(function()
          {
            var div = document.createElement('div')
            div.innerHTML = '<a href="?#tests">Run tests</a>'
            div.id = 'mocha'
            $(div).insertBefore($('#capture-container'))
          })
        }
      }
    }


    function initialize(callback)
    {
      var App = window.App = window.App || AppSingleton
      App.collections = App.collections || {}
      App.collectionClasses = App.collectionClasses || {}
      App.models = App.models || {}
      App.views = App.views || {}

      require(['config/config', './router'], function(config, Router)
      {
        // TODO(hbt) add global router
        new Router()
        App.config = config

        // TODO(hbt) refactor
        CustomEnvironment.configure(App.config.envName)
        require(['models/task'], function()
        {
          require(['view-model/vm-capture'], function()
          {
            callback()
          })
        })

      })
    }


    return {
      init: initialize
    }
  }())


  // Note(hbt) only track reference using window.App or classes for looping
  // i.e we can have multiple collections and we need to refer to them from other modules or track a class like the model
  return AppSingleton
})
