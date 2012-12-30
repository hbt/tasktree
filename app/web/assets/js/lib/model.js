define(['backboneStore'], function()
{
  var Model = Backbone.Model.extend({
    modelName:    'Info',
    defaults:     function()
    {
      return {
        metadata: [],
        children: [],
        isMetadata: false
      }
    },
    localStorage: new Backbone.LocalStorage(window.App.config.namespace + 'data'),

    addMetadata: function(metadata)
    {
      var metadataIds = this.get('metadata')
      var ret = null
      var collMetadata = window.App.collections.Metadata

      // validate

      // TODO(hbt) find a way to isolate this e.g detect the parameter is an array and loop through the function using a mixin
      // is array?
      if(_.isArray(metadata))
      {
        var that = this
        _.each(metadata, function(v)
        {
          that.addMetadata(v)
        })

        return null
      }
      // is Model?
      else if(metadata instanceof Model && !metadata.isNew())
      {
        // Note(hbt) careful: could break a reference in the collection if metadata is not created properly
        ret = metadata
        metadataIds.push(ret.get('id'))
      }
      // is json?
      else if(_.isObject(metadata))
      {
        ret = collMetadata.createUnique(metadata)
        metadataIds.push(ret.get('id'))
      }


      this.set({metadata: _.unique(metadataIds)})
      this.save()

      ret.addChild(this)

      return ret
    },

    removeMetadata: function()
    {
      throw new Error('Not yet implemented')
    },

    getMetadata: function()
    {
      var coll = window.App.collections.Metadata
      var metadata = coll.getByIds(this.get('metadata')) || []

      return new window.App.collectionClasses['Metadata'](metadata)
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

      this.set({children: _.unique(children)})
      this.save()
    },

    removeChild: function()
    {
      throw new Error('Not yet implemented')
    }

  });

  window.App.models['Info'] = window.App.models['Info'] || Model
  // TODO(hbt) inv how to add functions that will only be available in the modules

  return window.App.models['Info']
})