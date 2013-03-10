define([], function()
{
  var Helpers = {
    reset: function()
    {
      // reset local storage
      App.config.namespace = 'tasktree-' + (new Date())


      // reset global collections
      _.each(App.collections, function(v)
      {
        v.global.reset(null)
      })

      Backbone.Relational.store.reset()
    }
  }

  return Helpers
})