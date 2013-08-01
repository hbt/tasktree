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
      // reset collections
      _.each(App.collections, function(v)
      {
        v.reset(null)
      })


      Backbone.Relational.store.reset()
    }

  }

  return Helpers
})