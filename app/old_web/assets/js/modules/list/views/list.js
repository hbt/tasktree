define(['./one'], function(One)
{
  var tasks = window.App.collections['Tasks'] = window.App.collections['Tasks'] || new window.App.collectionClasses.Data()
  var View = Backbone.View.extend({
    el: $('#list-container'),

    addOne:     function(model, collection, attrs)
    {
//      var view = new One(model, tasks)
//      if(attrs && attrs.at !== undefined)
//      {
//        if(attrs.at === 0)
//        {
//          this.$el.prepend(view.$el)
//        }
//        else
//        {
//          var prev = this.$el.find('.one-task').eq(attrs.at-1)
//          c.l(attrs)
//          view.$el.insertAfter(prev)
////          c.l(prev)
////          this.$el.insertAfter(this.$el.find('.one-task').eq(attrs.at-1), view.$el)
//        }
//      }
//      else
//      {
//        this.$el.append(view.$el)
//      }

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
      this.render(model, collection, attrs)
    },

    // TODO(hbt) NEXT add model as a param
    // TODO(hbt) NEXT 14
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

    render: function(model, collection, attrs)
    {
      var that = this

      _.each(tasks.models, function(v)
      {
        var view = new One(v, tasks)
        that.$el.append(view.$el)

        if(attrs && attrs.focus && model && model === v)
        {
          view.$el.find('.task-input').focus()
        }
      })

      return this
    }
  })

  return View
})