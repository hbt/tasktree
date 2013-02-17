define(['models/task', 'mixins/backbone-collections'], function(Task, Mixins)
{
  var Tasks = Backbone.Collection.extend({
    model:        Task,
    modelName:    'Task',
    localStorage: new Backbone.LocalStorage(window.App.config.namespace + 'tasks')
  });

  Mixins.extend(Tasks)

  window.App.collectionClasses['Tasks'] = window.App.collectionClasses['Tasks'] || Tasks
  window.App.collections['Tasks'] = window.App.collections['Tasks'] || new Tasks()

  return window.App.collectionClasses['Tasks']
})