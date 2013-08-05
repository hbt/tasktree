define(['models/task', 'utils/schema'], function(Task, schema)
{
  var Tasks = Backbone.Collection.extend({
    database:  schema,
    storeName: 'tasks',
    model:     Task,
    modelName: 'Task'
  });


  window.App.collectionClasses['Tasks'] = window.App.collectionClasses['Tasks'] || Tasks
  window.App.collections['Tasks'] = window.App.collections['Tasks'] || new Tasks()

  return window.App.collectionClasses['Tasks']
})