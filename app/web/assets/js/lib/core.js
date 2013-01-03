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
            div.innerHTML = '<a href="?#tests">Run tests</a>'
            div.id = 'mocha'
            $(div).insertBefore($('#capture-container'))
          })
        }
      }
    }

    function getFiles()
    {
      var map = {
        others: 'model,collection,collections/metadata'
      }

      // TODO(hbt) refactor use _.chain
      var files = _.flatten(_.map(map, function(v, k)
      {
        return _.map(v.split(','), function(ov)
        {
          if(k === 'others')
          {
            return 'lib/' + ov
          }
          else
          {
            return 'lib/' + k + '/' + ov
          }
        })
      }))

      // TODO(hbt) add plugin list + retrieval
      files.push('modules/tag/main', 'modules/capture/main', 'modules/list/main', 'modules/status/main')

      // loop through plugin names

      {
        // return plugin/main
      }


      return files
    }

    function initialize(callback)
    {
      App.collections = App.collections || {}
      App.collectionClasses = App.collectionClasses || {}
      App.models = App.models || {}
      App.views = App.views || {}

      // TODO(hbt) add global namespace for localstorage
      require(['config/config', './router'], function(config, Router)
      {
        // TODO(hbt) add global router
        new Router()
        App.config = config

        CustomEnvironment.configure(App.config.envName)

        require(getFiles(), function()
        {

          _.events.trigger('app-init')
          callback()
        });
      })

    }


    return {
      init: initialize
    }
  }())


  var App
  // Note(hbt) only track reference using window.App or classes for looping
  // i.e we can have multiple collections and we need to refer to them from other modules or track a class like the model
  window.App = App = window.App || AppSingleton

  return window.App
})
