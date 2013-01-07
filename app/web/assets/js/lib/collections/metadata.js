define(['lib/model', './mixins'], function(Model, Mixins)
{
  var Collection = Backbone.Collection.extend({
    model:        Model,
    modelName:    'Info',
    localStorage: new Backbone.LocalStorage(window.App.config.namespace + 'metadata'),

    createUnique: function(json)
    {
      var coll = this.global
      var ret = null

      // check collection by id
      if(json.id && coll._byId[json.id])
      {
        ret = coll._byId[json.id]
        return ret
      }

      // Note(hbt) metadata content is unique. look it up first before creating
      // TODO(hbt) add index by content to accelerate look ups
      json.content = json.content.trim()
      ret = coll.find(function(v)
      {
        return v.get('content') === json.content
      })

      // still nothing? create
      if(!ret)
      {
        json.isMetadata = true
        ret = coll.create(json)
      }


      return ret
    }
  });


  _.extend(Collection.prototype, Mixins)

  // TODO(hbt) global collections should be fully initialized -- so createUnique will not add a new one with the same content but a different id
  // TODO(hbt) global collections fetch should verify content and update references -- e.g two offline devices creating the same content, different ids
  window.App.collections['Metadata'] = window.App.collections['Metadata'] || Mixins.createGlobalCollection(Collection)
  window.App.collectionClasses['Metadata'] = window.App.collectionClasses['Metadata'] || Collection

  return window.App.collectionClasses['Metadata']
})