define(['utils/schema'], function(schema)
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
    },

    relations: [
      {
        type: Backbone.HasMany,
        key:  'taskstags',
        relatedModel:    'App.models.TasksTags',
        collectionType:  'App.collectionClasses.TasksTags',
        reverseRelation: {
          key:           'tags',
          includeInJSON: 'id'
        }
      }
    ],

    getTasks: function()
    {
      return this.toJSON()['taskstags']
    }
  })



  window.App.models['Tag'] = window.App.models['Tag'] || Model

  return window.App.models['Tag']

})