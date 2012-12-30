
// TODO(hbt) move to its own module
define(['text!lib/views/info.html'], function(tmpltxt)
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

        window.App.collections.Tasks.create({content: input.value})

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