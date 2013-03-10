define([], function()
{
  var Model = Backbone.RelationalModel.extend({
    modelName: 'Task',
    localStorage: new Backbone.LocalStorage(window.App.config.namespace + 'tasks'),
    relations: [function()
    {
      return {
        type:            Backbone.HasMany,
        key:             'children',
        relatedModel:    App.models.Task,
        collectionType:  App.collectionClasses.Tasks,
        includeInJSON:   'id',
        autoFetch: true,
        reverseRelation: {
          key:           'parent',
          includeInJSON: 'id',
          autoFetch: true,
          type:          Backbone.HasOne,
        }
      }
    },
      function()
      {
        return {
          type:            Backbone.HasMany,
          key:             'tags',
          relatedModel:    App.models.Tag,
          collectionType:  App.collectionClasses.Tags,
          includeInJSON:   'id',
          autoFetch: true,
          reverseRelation: {
            key:           'tasks',
            includeInJSON: 'id',
            type:          Backbone.HasMany
          }
        }
      }
    ],
    defaults:  function()
    {
      return {
        content: ''
      }
    },

    setters: {
    }

  })


  window.App.models['Task'] = window.App.models['Task'] || Model
  return window.App.models['Task']
})