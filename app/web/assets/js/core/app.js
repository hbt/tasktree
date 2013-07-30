define(['require'], function(require)
{
  var AppSingleton = (function()
  {
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
        require(['core/router', 'utils/db'], function(Router, DBUtils)
        {
          new Router()

          // delete db and start fresh
          if(App.config.envName === 'dev')
          {
            DBUtils.deleteDatabase('tasktree')
          }

          // TODO(hbt) Refactor (low): generate / get list
          require(['models/task', 'collections/tasks', 'models/tag', 'collections/tags'], function()
          {
            // TODO(hbt) Refactor (high): initialize backbone relations after every has been loaded
            App.models.Task.setup()

            // trigger the migrations
            // TODO(hbt) review the sequence of events + if this can be improved
            App.collections.Tags.fetch()
            _.events.once('database-ready', function()
            {
              require(['view-model/vm-capture', 'view-model/vm-list', 'view-model/tag/vm-list'], function()
              {
                callback()
              })
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