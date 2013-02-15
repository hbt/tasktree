define(['lib/model', 'lib/collections/metadata', 'lib/collections/mixins'], function(Model, MetadataCollection, Mixins)
{
  // TODO(hbt) extend from metadata
  var Collection = MetadataCollection.extend({
    model:        Model,
    modelName:    'Info',
    // TODO(hbt) consider making tags their own collection + index
    localStorage: new Backbone.LocalStorage(window.App.config.namespace + 'tags'),

    getContent: function()
    {
      // TODO(hbt) refactor to use pluck
      return this.pluck('content')
    }
  });


//  _.extend(Collection.prototype, MetadataCollection)
  _.extend(Collection.prototype, Mixins)

  // global references
  Collection.prototype.global = null
  window.App.collections['Tags'] = window.App.collections['Tags'] || Mixins.createGlobalCollection(Collection)
  window.App.collectionClasses['Tags'] = window.App.collectionClasses['Tags'] || Collection


  return window.App.collectionClasses['Tags']
})
