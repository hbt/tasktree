define([], function()
{
  var Model = Backbone.RelationalModel.extend({
    modelName: 'Task',
    relations: [function()
    {
      return {
        type:            Backbone.HasMany,
        key:             'children',
        relatedModel:    App.models.Task,
        collectionType:  App.collectionClasses.Tasks,
        includeInJSON: 'id',
        reverseRelation: {
          key:           'parent',
          includeInJSON: 'id'
        }
      }
    }
    ],
//    relations2: function()
//    {
//      return [
//        {
//          // one task has many children tasks
//          type:            Backbone.Model.Relation.types.OneMany,
//          key:             'children',
//          model:           App.models.Task,
//          collection:      App.collectionClasses.Tasks,
//          reverseRelation: {
//            key: 'parent'
//          }
//        },
//        {
//          // one task has many tags and vice-versa
//          type:            Backbone.Model.Relation.types.ManyMany,
//          key:             'tags',
//          model:           App.models.Tag,
//          collection:      App.collectionClasses.Tags,
//          reverseRelation: {
//            key: 'tasks'
//          }
//        }
//      ];
//    },
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