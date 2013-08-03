define([], function()
{

  var Model = Backbone.RelationalModel.extend({
    modelName: 'TasksTags'
  })

  window.App.models['TasksTags'] = window.App.models['TasksTags'] || Model

  return window.App.models['TasksTags']
})
