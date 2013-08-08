define(['backbone'], function()
{
  var exports = {}

  var Relations = {
    findRelated: function(current, model, model2)
    {
      var related = null

      // 2 is a collection
      if(model instanceof Backbone.Model && model2 instanceof Backbone.Collection)
      {
        // 1 is the related model
        related = model
      }
      
      // 1 & 2 are models
      else if(model instanceof Backbone.Model && model2 instanceof Backbone.Model)
      {
        // 2 is the related model
        related = model2
      }

      // related cannot be the same as current
      related = (related && related !== current && related) || null

      // link model e.g taskstags
      if(related && !related.storeName)
      {
        // find the related instances -- in cases of link model, we don't care about the link model but the related instance to the current model (this)
        // e.g task -> tag  if current model (this) is a task
        var found = _.find(related._relations, function(v, relationName)
        {
          return related.attributes[relationName] && related.attributes[relationName] !== current
        }, current)

        // get related model if found
        related = (found && related.attributes[found.key]) || null
      }

      return related
    },

    /**
     * updates the map whenever events related to relations are triggered (add/remove/change)
     * This is designed to know which model has been updated and which related models should be saved as well
     *
     * Related to the single save feature
     *
     * // Note(hbt) Possible bug with the eventQueue -- view first line. Still experimental. Haven't found a case yet
     * @param model
     * @param model2
     */
    updateRelationsMap: function(model, model2)
    {
      // do not process when queue is blocked -- backbone relational fires a lot of events
      if(Backbone.Relational.eventQueue._queue.length !== 0)
      {
        return
      }

      var related = Relations.findRelated(this, model, model2)
      if(related && related !== this)
      {
        // init
        var map = Backbone.Relational.rmap
        map = map || {}
        map[this.get('id')] = map[this.get('id')] || []


        map[this.get('id')].push(related)

        // TODO(hbt) inv using groupby
        // remove duplicates
        var tmp = {}
        _.each(map[this.get('id')], function(v)
        {
          tmp[v.get('id')] = v
        })
        map[this.get('id')] = _.values(tmp)


        Backbone.Relational.rmap = map
      }
    }
  }


  /**
   * provide models with an id instead of waiting for a callback from the db with one
   */
  exports.initialize = function()
  {
    if(this.isNew() && this.storeName)
    {
      this.set('id', App.utils.guid())
    }

    var self = this
    var relationKeys = _.keys(this._relations)


    // save related models
    if(relationKeys.length && this.storeName)
    {
      // listen to changes in relations
      _.each(relationKeys, function(key)
      {
        _.each(['add', 'remove', 'change'], function(eName)
        {
          var eventName = eName + ':' + key
          self.on(eventName, Relations.updateRelationsMap)
        })
      })
    }
  }


  var saveBak = Backbone.Model.prototype.save
  /**
   * only meant to be used internally. So no need to support the val/options ala backbone
   * @param key
   * @param val
   * @param options
   */
  exports.save = function()
  {
    this.trigger('pre-save')

    // save related instances
    if(Backbone.Relational.rmap && Backbone.Relational.rmap[this.get('id')])
    {
      // clear related instances
      var map = Backbone.Relational.rmap[this.get('id')]
      Backbone.Relational.rmap[this.get('id')] = []

      _.each(map, function(relatedModel)
      {
        // clear current instance from related instances -- to prevent recursive saves
        var rmap = Backbone.Relational.rmap[relatedModel.get('id')]
        rmap = _.without(rmap, this)
        Backbone.Relational.rmap[relatedModel.get('id')] = rmap

        relatedModel.save()
      }, this)
    }


    return saveBak.apply(this, arguments);
  }


  return exports
})