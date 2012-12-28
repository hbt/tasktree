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
            $(div).insertBefore($('#capture-container'))
          })
        }
      }
    }

    function getFiles()
    {
      var map = {
        views:  'main',
        others: 'router,model,collection'
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

      files.push('config/config')

      return files
    }

    function initialize(callback)
    {
      App.collections = App.collections || {}
      App.models = App.models || {}
      App.views = App.views || {}

      require(getFiles(), function()
      {
        CustomEnvironment.configure(App.config.envName)

        ;
        new App.views['Main']()


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
