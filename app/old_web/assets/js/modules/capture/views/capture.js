define(['hbs!modules/capture/views/capture.tmpl'], function(tmpl)
{
  var View = Backbone.View.extend({
    el: $('#capture-container'),

    events: {
      'keydown': 'save'
    },


    save: function(e)
    {
      if(e.keyCode === 13)
      {
        var input = e.target

        window.App.collections.Tasks.create({content: input.value}, {at: 0})

        input.value = ''
      }
    },

    initialize: function()
    {
      this.render()
    },

    render: function()
    {
      this.$el.html($(tmpl()))
      return this
    }
  })

  return View
})