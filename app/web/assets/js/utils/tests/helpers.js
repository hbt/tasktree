define(['utils/db'], function(DB)
{
  var Helpers = {
    reset: function(callback)
    {
      this.resetCollections()
      Backbone.Relational.eventQueue = new Backbone.BlockingQueue();

      // close all db connections
      Backbone.sync('closeall')
      DB.deleteDatabase(App.config.databaseName, function()
      {
        // trigger migrations for new db
        App.collections.Tags.fetch()
        _.events.on('database-ready', _.once(function()
        {
          callback()
        }))
      })

    },

    resetCollections: function()
    {
      // reset collections without destroying references to collections in views
      _.each(Backbone.Relational.store._collections, function(coll)
      {
        // remove listeners on existing models -- to prevent it from triggering callbacks after the test is done
        coll.each(function(model)
        {
          Backbone.Relational.store.unregister(model)
          // creates issues with capture
          // model.off()
        })
        coll.reset([])
      })

      _.each(App.collections, function(v)
      {
        v.each(function(model)
        {
          model.off()
        })

        // Note(hbt) consider removing callbacks on collections as well -- will create issues with knockback
        v.reset()
      })


      Backbone.Relational.store.stopListening()
      Backbone.Relational.store._subModels = []
    }

  }

  return Helpers
})