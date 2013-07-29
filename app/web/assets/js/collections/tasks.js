define(['models/task', 'mixins/backbone-collections', 'utils/schema'], function(Task, Mixins, schema)
{
  var Tasks = Backbone.Collection.extend({
    database: schema,
    storeName: 'tasks',
    model:        Task,
    modelName:    'Task'
  });

  Mixins.extend(Tasks)

  window.App.collectionClasses['Tasks'] = window.App.collectionClasses['Tasks'] || Tasks
  window.App.collections['Tasks'] = window.App.collections['Tasks'] || new Tasks()

  return window.App.collectionClasses['Tasks']
})