define([], function()
{
  var Helpers = {
    reset: function()
    {
      // reset local storage
      _.each(App.models, function(Model)
      {
        Model.prototype.localStorage._clear()
      })


      this.resetCollections()

      Backbone.Relational.store.reset()
      Backbone.Relational.eventQueue = new Backbone.BlockingQueue();
    },

    resetCollections: function()
    {

      // reset global collections
      _.each(App.collections, function(v)
      {
        v.global.reset(null)
        v.reset(null)
      })


      Backbone.Relational.store.reset()
    }

  }

  return Helpers
})