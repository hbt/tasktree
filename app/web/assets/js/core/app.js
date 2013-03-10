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
            localStorage.clear()
            App.models.Task.setup()
            var t = App.models.Task.prototype.global.create({content: 'new'})
            var c1 = App.models.Task.prototype.global.create({content: 'child 2'})
            t.get('children').add(c1)
            t.save()

//            t.get('children').remove(c1)
//            t.save()
//            c1.save()
//            console.log(c1 instanceof Backbone.Model)
//            Backbone.Model.Relation.setup(_.values(App.models))


            var k = App.models.Task.prototype.global.create({content: 'new task'})
            var k2 = App.models.Task.prototype.global.create({content: 'soomemetask'})
            var g1 = App.models.Tag.prototype.global.create({content: 'tag1'})
            var g2 = App.models.Tag.prototype.global.create({content: 'tag2'})
            k.get('tags').add([g1, g2])
//            g1.save()
//            g2.save()
            k.save()

            k2.get('tags').add([g1, g2])
//            g1.save()
//            g2.save()
            k2.save()

            console.log('rr')
            k.get('tags').remove(g1)
            console.log(_.copy(g1))
//            g1.save()
            k.save()
            assert.is(k.get('tags').length, 1)
            assert.is(g1.get('tasks').length, 1)
//            k.save()
            console.log(localStorage, k)
//            localStorage.clear()

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