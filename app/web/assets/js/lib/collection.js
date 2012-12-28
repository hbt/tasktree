define(['lib/model'], function(Model)
{
  var Collection = Backbone.Collection.extend({
    model:        Model,
    modelName:    'Info',
    localStorage: new Backbone.LocalStorage('data')
  });

  var collection = new Collection()
  window.App.collections['Data'] = window.App.collections['Data'] || collection

  return window.App.collections['Data']
})