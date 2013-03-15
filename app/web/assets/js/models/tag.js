define(['mixins/backbone-model-helpers'], function(ModelHelpers)
{
  var Model = Backbone.RelationalModel.extend({
    modelName:    'Tag',
    localStorage: new Backbone.LocalStorage(window.App.config.namespace + 'tags'),

    defaults: function()
    {
      return {
        content: ''
      }
    }
  })

  _.extend(Model.prototype, ModelHelpers)


  window.App.models['Tag'] = window.App.models['Tag'] || Model

  return window.App.models['Tag']

})