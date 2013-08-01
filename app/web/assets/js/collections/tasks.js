define(['models/task', 'utils/schema'], function(Task, schema)
{
  var Tasks = Backbone.Collection.extend({
    database:  schema,
    storeName: 'tasks',
    model:     Task,
    modelName: 'Task'
  });


  // TODO(hbt) Refactor (low): add mixins + adds models in app.js + remove duplicated code from models + collections at the bottom
  window.App.collectionClasses['Tasks'] = window.App.collectionClasses['Tasks'] || Tasks
  window.App.collections['Tasks'] = window.App.collections['Tasks'] || new Tasks()

  return window.App.collectionClasses['Tasks']
})