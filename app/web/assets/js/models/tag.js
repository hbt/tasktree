define([], function()
{
  var Model = Backbone.RelationalModel.extend({
    modelName: 'Tag',
    localStorage: new Backbone.LocalStorage(window.App.config.namespace + 'tags'),

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