define(['hbs!modules/tag/views/one.tmpl'], function(tmpltxt)
{
  var tasks = window.App.collections.Tasks
  var View = Backbone.View.extend({

    model: null,

    events: {
      'keydown': 'save'
    },

    save: function(e)
    {
      if(e.keyCode === 13)
      {
        var input = e.target
        var id = input.id.replace('tag-', '')

        tasks._byId[id].save({content: input.value })
      }
    },

    initialize:     function(model)
    {
      this.model = model
//      this.model.on('change', this.updateOnChange, this)
      this.listenTo(model, 'change', this.updateOnChange)
      this.render()
    },

    // TODO(hbt) does not work when it comes to updating the tags count chioldren
    updateOnChange: function()
    {
      // parentElement is the list container. not in the container means this view is a dead reference.
      // make it easy for the garbage collector to take it away
      if(this.el.parentElement === null)
      {
        this.remove()
      }
      else
      {
        this.render()
      }

    },

//    // TODO(hbt) remove this and change listening to
//    // view.listenTo(model, 'change', view.render)
//    // this way the default backbone remove will trigger stopListening which will remove this event
//    remove:         function()
//    {
//      this.model.off('change', this.updateOnChange)
//      this.model = null
//      this.undelegateEvents()
//      Backbone.View.prototype.remove.call(this);

//      // Note(hbt) seems necessary because even after the operations above we still have a reference to this.$el
//      this.setElement(null)
//    },

    render: function()
    {
      this.$el.html($(tmpltxt({model: this.model})))
      return this
    }
  })

  window.App.views['One'] = View

  return View
})