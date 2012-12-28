define(['text!lib/views/info.html', 'lib/collection'], function(tmpltxt, data)
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

        data.create({content: input.value})

        input.value = ''
      }
    },

    initialize: function()
    {
      this.render()
    },

    render: function()
    {
      this.el.innerHTML = tmpltxt
      return this
    }
  })

  window.App.views['Capture'] = View

  return View
})