define(['lib/collection', 'lib/views/one'], function(data, One)
{
  var View = Backbone.View.extend({
    el: $('#list-container'),

    addOne: function(model)
    {
      var view = new One(model)
      $(this.el).append(view.$el)
    },

    initialize: function()
    {
      data.fetch()
      data.on('add', this.addOne, this)

      this.render()
    },

    render: function()
    {
      var that = this
      _.each(data.models, function(v)
      {
        that.addOne(v)
      })

      return this
    }
  })

  window.App.views['List'] = View

  return View
})
