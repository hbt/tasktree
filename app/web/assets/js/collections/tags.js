define(['models/tag', 'mixins/backbone-collections'], function(Tag, Mixins)
{
  var Tags = Backbone.Collection.extend({
    model:        Tag,
    modelName:    'Tag',
    localStorage: new Backbone.LocalStorage(window.App.config.namespace + 'tags')
  });

  Mixins.extend(Tags)

  window.App.collectionClasses['Tags'] = window.App.collectionClasses['Tags'] || Tags
  window.App.collections['Tags'] = window.App.collections['Tags'] || new Tags()

  return window.App.collectionClasses['Tags']
})