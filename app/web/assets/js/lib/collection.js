// Note(hbt) all collections matching the class name e.g Data Metadata are global
// once references are loaded they should not be removed nor reset
// as those references are used by the rest of the app

define(['lib/model', 'lib/collections/mixins'], function(Model, Mixins)
{
  // TODO(hbt) refactor + move to collections/
  var Collection = Backbone.Collection.extend({
    model:        Model,
    modelName:    'Info',
    localStorage: new Backbone.LocalStorage(window.App.config.namespace + 'data')
  });


  _.extend(Collection.prototype, Mixins)

  // global references
  window.App.collections['Data'] = window.App.collections['Data'] || Mixins.createGlobalCollection(Collection)
  window.App.collectionClasses['Data'] = window.App.collectionClasses['Data'] || Collection


  return window.App.collectionClasses['Data']
})