define(['./one'], function(One)
{
  var tasks = window.App.collections['Tasks'] = window.App.collections['Tasks'] || new window.App.collectionClasses.Data()
  var View = Backbone.View.extend({
    el: $('#list-container'),

    addOne: function()
    {
      // TODO(hbt) optimize instead of rendering the whole view again, only add/remove stuff
      this.$el.html('')
      this.render()
    },

    initialize: function()
    {
      // TODO(hbt) add tag filters
      tasks.fetch()
      tasks.on('add', this.addOne, this)

      this.render()
    },

    render: function()
    {
      var that = this

      _.each(tasks.models, function(v)
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