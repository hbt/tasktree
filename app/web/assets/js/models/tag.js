define(['mixins/backbone-model-helpers', 'utils/schema'], function(ModelHelpers, schema)
{
  var Model = Backbone.RelationalModel.extend({
    database:  schema,
    storeName: 'tags',
    modelName: 'Tag',

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