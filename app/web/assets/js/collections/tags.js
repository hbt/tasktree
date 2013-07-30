define(['models/tag', 'mixins/backbone-collections', 'utils/schema'], function(Tag, Mixins, schema)
{
  var Tags = Backbone.Collection.extend({
    database:  schema,
    storeName: 'tags',
    model:     Tag,
    modelName: 'Tag'
  });

  Mixins.extend(Tags)


  window.App.collectionClasses['Tags'] = window.App.collectionClasses['Tags'] || Tags
  window.App.collections['Tags'] = window.App.collections['Tags'] || new Tags()

  return window.App.collectionClasses['Tags']
})