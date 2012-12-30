// TODO(hbt) get rid of this
define(['lib/views/capture', 'lib/views/list'], function(Capture, List)
{
  var View = Backbone.View.extend({
    el: $('#main-container'),

    initialize: function()
    {

      new Capture()
      ;
      new List()

      this.render()
    },

    render: function()
    {
      return this
    }
  })

  window.App.views['Main'] = View

  return View
})