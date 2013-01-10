define(['./one'], function(One)
{
  var tasks = window.App.collections['Tasks'] = window.App.collections['Tasks'] || new window.App.collectionClasses.Data()
  var View = Backbone.View.extend({
    el: $('#list-container'),

    addOne: function()
    {
      // TODO(hbt) optimize instead of rendering the whole view again, only add/remove stuff
      // TODO(hbt) NEXT use insertAfter, insertBefore

      // TODO(hbt) NEXT is empty?
      if(true)
      {
        // TODO(hbt) NEXT use append
      }
      // TODO(hbt) NEXT is index 0, use insertBefore
      else if(true)
      {

      }
      else
      {
        // TODO(hbt) NEXT use insertAfter
      }
      // TODO(hbt) NEXT elements should represent the collection
      this.$el.html('')
      this.render()
    },

    // TODO(hbt) NEXT add model as a param
    initialize: function()
    {
      // TODO(hbt) NEXT tasks collection should be custom i.e if model, tasks are children otherwise, it is from the tags

      // TODO(hbt) NEXT listen to model onchange and render children -- change:children change:parent

      // TODO(hbt) NEXT add remove


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