define([], function()
{

  var exports = {}


  exports.getById = function(id)
  {
    var ret = null

    // check collection
    if(this._byId[id])
    {
      ret = this._byId[id]
    }
    else
    {
      // TODO(hbt) add test to retrieve tasks by id for filtering
      // TODO(hbt) make sure metadata is fully initialized as this will created new references
      var json = this.localStorage.find({id: id})
      var model = new this.model(json)
      this.add(model)
      ret = model
    }

    return ret
  }

  exports.getByIds = function(ids)
  {
    var ret = []
    if(_.isArray(ids))
    {
      for(var i = 0; i < ids.length; i++)
      {
        var model = this.getById(ids[i])
        if(model)
        {
          ret.push(model)
        }
      }
    }
    else
    {
      ret = this.getById(ids)
    }

    ret = ret || null

    return ret
  }


  exports.create = function(model, options)
  {
    var ret = null

    // get by id if model or json with an id
    // TODO(hbt) check instanceof is not comparing functions but backbone model. otherwise use backbone model name
    var isModel = model instanceof this.model && model.get('id');
    var isJSON = _.isObject(model) && model.id
    if(model && (isModel || isJSON))
    {
      var id = (isModel && model.get('id')) || (isJSON && model.id)
      ret = this.global.getById(id)
    }
    else
    {
      // create it in the global collection to track the reference
      ret = Backbone.Collection.prototype.create.apply(this.global, [model, options])
    }

    // add it to the current collection
    this.add(ret, options)

    return ret
  }


  exports.createGlobalCollection = function(CollClass)
  {
    if(!CollClass.prototype.global)
    {
      CollClass.prototype.global = new CollClass()
    }

    return CollClass.prototype.global
  }

  return exports
})