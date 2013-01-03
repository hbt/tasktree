define(['backboneStore'], function()
{
  var Model = Backbone.Model.extend({
    modelName: 'Info',
    defaults:  function()
    {
      return {
        metadata:   [],
        children:   [],
        isMetadata: false
      }
    },

    initialize: function(attrs, opts)
    {
      opts = opts || {}

      if(!opts.silent)
      {
        _.events.trigger('model-info-init', this)
      }
    },

    addMetadata: function(metadata, collectionName)
    {
      var collName = collectionName || 'Metadata'
      var metadataIds = this.get('metadata')
      var ret = null
      var collMetadata = window.App.collections[collName]

      // is array?
      if(_.isArray(metadata))
      {
        for(var i = 0; i < metadata.length; i++)
        {
          this.addMetadata(metadata[i], collectionName)
        }
        return null
      }

      // is Model?
      else if(metadata instanceof Model && !metadata.isNew())
      {
        // Note(hbt) careful: could break a reference in the collection if metadata is not created properly
        ret = metadata
        metadataIds.push(ret.get('id'))
      }

      // TODO(hbt) add string support here

      // is json?
      else if(_.isObject(metadata))
      {
        ret = collMetadata.createUnique(metadata)
        metadataIds.push(ret.get('id'))
      }

      this.save({metadata: _.unique(metadataIds)})
      ret.addChild(this)

      return ret
    },

    removeMetadata: function(metadata, collectionName)
    {
      var collName = collectionName || 'Metadata'
      var metadataIds = this.get('metadata')
      var collMetadata = window.App.collections[collName]

      if(_.isArray(metadata))
      {
        for(var i = 0; i < metadata.length; i++)
        {
          this.removeMetadata(metadata[i], collectionName)
        }
        return null
      }
      else if(_.isString(metadata))
      {
        metadata = {content: metadata}
      }

      // is either a proper Model OR a JSON Object and therefore get its reference
      // TODO(hbt) abstract into utils to return metadata object and run the same checks on removeMetadata and addMetadata
      // // TODO(hbt) then refactor
      var existingMeta = (metadata instanceof Model && metadata) || (_.isObject(metadata) && collMetadata.createUnique(metadata))

      // remove id from array
      metadataIds = _.without(metadataIds, existingMeta.get('id'))
      this.save({metadata: _.unique(metadataIds)})

      existingMeta.removeChild(this)

      return _.indexOf(metadataIds, existingMeta.get('id')) === -1
    },

    hasMetadata: function(metadata)
    {
      return _.indexOf(this.get('metadata'), metadata.get('id')) === -1
    },

    getMetadata: function(collectionName)
    {
      var collName = collectionName || 'Metadata'
      var coll = window.App.collections[collName]
      var metadata = coll.getByIds(this.get('metadata')) || []

      return new window.App.collectionClasses[collName](metadata)
    },

    getChildren: function()
    {
      var coll = window.App.collections.Data
      var children = coll.getByIds(this.get('children')) || []

      return new window.App.collectionClasses['Data'](children)
    },

    addChild: function(model)
    {
      var children = this.get('children')
      children.push(model.get('id'))

      this.save({children: _.unique(children)})
    },

    removeChild: function(model)
    {
      this.save({children: _.chain(this.get('children')).without(model.get('id')).unique().value()})
    },

    hasChild: function(model)
    {
      return _.indexOf(this.get('children'), model.get('id')) === -1
    }

  })

  window.App.models['Info'] = window.App.models['Info'] || Model
  // TODO(hbt) inv how to add functions that will only be available in the modules

  return window.App.models['Info']
})