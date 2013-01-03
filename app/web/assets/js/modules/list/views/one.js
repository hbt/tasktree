define(['hbs!modules/list/views/one.tmpl'], function(tmpltxt)
{
  var tasks = window.App.collections.Tasks
  var View = Backbone.View.extend({

    model: null,

    events: {
      'keydown .task-input': 'save',
      'change .status':      function()
      {
        this.model.toggleDone()
      }
    },

    save: function(e)
    {
      if(e.keyCode === 13)
      {
        var input = $(e.target)
        var id = input.data('id')

        tasks._byId[id].save({content: input.value })
      }
    },

    initialize: function(model)
    {
      this.model = model
      this.listenTo(model, 'change', this.updateOnChange)

      this.render()
    },

    updateOnChange: function()
    {
      if(this.el.parentElement === null)
      {
        this.remove()
      }
      else
      {
        this.render()
      }
    },

    render: function()
    {
      this.$el.html($(tmpltxt({
        id:      this.model.get('id'),
        content: this.model.get('content'),
        status:  this.model.isDone() ? 'checked' : ''
      })))

      return this
    }
  })

  window.App.views['One'] = View

  return View
})