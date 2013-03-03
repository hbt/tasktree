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
        require(['core/router'], function(Router)
        {
          new Router()

          // TODO(hbt) Refactor (low): generate / get list
          require(['models/task', 'collections/tasks', 'models/tag', 'collections/tags'], function()
          {
            Backbone.Model.Relation.setup(_.values(App.models))
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