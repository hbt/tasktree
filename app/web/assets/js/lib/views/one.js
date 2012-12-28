define(['hbs!lib/views/one.tmpl', 'lib/collection'], function(tmpltxt, data)
{
  var View = Backbone.View.extend({

    el:    null,
    model: null,

    events: {
      'keydown': 'save'
    },

    save: function(e)
    {
      if(e.keyCode === 13)
      {
        var input = e.target
        var id = input.id.replace('task-', '')

        data._byId[id].save({content: input.value })
      }
    },

    initialize: function(model)
    {
      this.model = model
      this.render()
    },

    render: function()
    {
      this.$el = $(tmpltxt({model: this.model}))

      return this
    }
  })

  window.App.views['One'] = View

  return View
})