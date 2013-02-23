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


          // TODO(hbt) Refactor (high): in test runner
          // add shortcuts to run tests
          $(document).ready(function()
          {
            var div = document.createElement('div')
            div.innerHTML = '<a href="?#tests">Run tests</a>'
            div.id = 'mocha'
            $(div).insertBefore($('#messages-container'))
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
      App.vm = App.vm || {}
      App.services = App.services || {}

      require(['config/config'], function(config)
      {
        App.config = config
        require(['core/router'], function(Router)
        {
          new Router()

          // TODO(hbt) Refactor (high):
          CustomEnvironment.configure(App.config.envName)
          require(['models/task', 'collections/tasks'], function()
          {
            require(['view-model/vm-capture', 'view-model/vm-list'], function()
            {
              callback()
            })
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