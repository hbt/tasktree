define(['backboneStore'], function()
{
  var Model = Backbone.Model.extend({
    modelName:    'Info',
    defaults:     {
      metadata: []
    },
    localStorage: new Backbone.LocalStorage('data')
  });

  window.App.models['Info'] = window.App.models['Info'] || Model

  return window.App.models['Info']
})