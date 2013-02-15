// TODO(hbt) fix duplicated code with tasks/list
define(['./one'], function(One)
{
  var tags = window.App.collections['Tags']
  var View = Backbone.View.extend({
    el: $('#tags-container'),

    addOne: function()
    {
      // TODO(hbt) optimize instead of rendering the whole view again, only add/remove stuff
      this.$el.html('')
      this.render()
    },

    initialize: function()
    {
      // TODO(hbt) add tag filters
      tags.fetch()
      tags.on('add', this.addOne, this)

      this.render()
    },

    render: function()
    {
      var that = this

      _.each(tags.models, function(v)
      {
        var view = new One(v)
        that.$el.append(view.$el)
        vv = view
      })

      return this
    }
  })

  return View
})