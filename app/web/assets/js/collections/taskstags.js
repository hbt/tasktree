define(['models/taskstags'], function(TasksTagsModel)
{
  var TasksTags = Backbone.Collection.extend({
    model:     TasksTagsModel,
    modelName: 'TasksTags'
  });


  window.App.collectionClasses['TasksTags'] = window.App.collectionClasses['TasksTags'] || TasksTags
  window.App.collections['TasksTags'] = window.App.collections['TasksTags'] || new TasksTags()

  return window.App.collectionClasses['TasksTags']
})