define([], function()
{
  var Model = Backbone.Model.extend({
    modelName: 'Task',
    relations: function()
    {
      return [
        {
          // one task has many children tasks
          type:             Backbone.Model.Relation.types.OneMany,
          key:              'Children',
          model:            App.models.Task,
          collection:       App.collectionClasses.Tasks,
          reverse_relation: {
            key: 'Parent'
          }
        },
        {
          // one task has many tags and vice-versa
          type:             Backbone.Model.Relation.types.ManyMany,
          key:              'Tags',
          model:            App.models.Tag,
          collection:       App.collectionClasses.Tags,
          reverse_relation: {
            key: 'Tasks'
          }
        }
      ];
    },
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