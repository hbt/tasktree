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

      require(['config/config', 'utils/utils'], function(config, Utils)
      {
        App.config = config
        App.utils = Utils

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

////              console.log(App.collections.Tasks.create({content: 'some'}))
//              var t = new App.models.Task({content: 'as'})
//              t.save()
//              console.log('n', t.get('id'))
//              t.save()
//              console.log('u', t.get('id'))
//              console.log(Backbone.Relational.store)
//              window.setTimeout(function()
//              {
//              }, 1000)
//              App.collections.Tasks.fetch({success: function()
//              {
//                console.log(App.collections.Tasks)
//              }})
//              return;
//              App.collections.Tasks.create({content: 'some'}).then(function()
//              {
//                console.log('hh')
//              })
//              return;

              require(['view-model/vm-capture', 'view-model/vm-list'], function()
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