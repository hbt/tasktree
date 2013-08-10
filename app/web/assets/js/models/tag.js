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
        type:            Backbone.HasMany,
        key:             'taskstags',
        relatedModel:    'App.models.TasksTags',
        collectionType:  'App.collectionClasses.TasksTags',
        reverseRelation: {
          key:           'tag',
          includeInJSON: 'id'
        }
      }
    ],

    getTasks: function()
    {
      var coll = new App.collectionClasses.Tasks()
      var tags = this.get('taskstags').map(function(v)
      {
        return v.get('task')
      })

      // reset + filters out duplicates -- use groupby if mistaken
      coll.reset(tags)

      return coll
    }
  })


  window.App.models['Tag'] = window.App.models['Tag'] || Model

  return window.App.models['Tag']

})