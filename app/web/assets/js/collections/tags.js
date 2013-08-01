define(['models/tag', 'utils/schema'], function(Tag, schema)
{
  var Tags = Backbone.Collection.extend({
    database:  schema,
    storeName: 'tags',
    model:     Tag,
    modelName: 'Tag'
  });


  window.App.collectionClasses['Tags'] = window.App.collectionClasses['Tags'] || Tags
  window.App.collections['Tags'] = window.App.collections['Tags'] || new Tags()

  return window.App.collectionClasses['Tags']
})