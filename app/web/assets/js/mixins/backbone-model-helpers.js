define(['backbone'], function()
{
  var exports = {}


  /**
   * backbone relational sends first param as model for hasMany
   * @param model
   * @param model2
   * @param opts
   */
  function updateRelationsMap(model, model2)
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

    if(related && related.storeName)
    {
      // init
      var map = Backbone.Relational.rmap
      map = map || {}
      map[this.get('id')] = map[this.get('id')] || []


      map[this.get('id')].push(related)

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

  /**
   * provide models with an id instead of waiting for a callback from the db with one
   */
  exports.initialize = function()
  {
    if(this.isNew())
    {
      this.set('id', App.utils.guid())
    }

    var self = this
    var relationKeys = _.keys(this._relations)


    // save related models
    if(relationKeys.length)
    {
      // listen to changes in relations
      _.each(relationKeys, function(key)
      {
        _.each(['add', 'remove', 'change'], function(eName)
        {
          var eventName = eName + ':' + key
          self.on(eventName, updateRelationsMap)
        })
      })


      // save related after saving model
      this.on('sync', function()
      {
        if(Backbone.Relational.rmap && Backbone.Relational.rmap[self.get('id')])
        {
          var map = Backbone.Relational.rmap[self.get('id')]
          _.each(map, function(relatedModel)
          {
            relatedModel.save(null, null, {clearRelated: self})
          })

          Backbone.Relational.rmap[self.get('id')] = []
        }
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
  exports.save = function(key, val, options)
  {
    // if this model is related to another one. The other triggered the save,
    // therefore remove it from the relational map to prevent them from saving each other infinitely
    if(options && options.clearRelated)
    {
      var map = Backbone.Relational.rmap[this.get('id')]

      _.each(map, function(v, k)
      {
        if(v === options.clearRelated)
        {
          map.slice(k, 1)
        }
      })

      Backbone.Relational.rmap[this.get('id')] = map
    }


    this.trigger('pre-save')
    return saveBak.apply(this, arguments);
  }


  return exports
})