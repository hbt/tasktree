define([], function()
{
  var Model = Backbone.RelationalModel.extend({
    modelName: 'Tag',

    defaults: function()
    {
      return {
        content: ''
      }
    }
  })


  window.App.models['Tag'] = window.App.models['Tag'] || Model

  return window.App.models['Tag']

})