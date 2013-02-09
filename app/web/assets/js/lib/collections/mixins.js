define([], function()
{

  var exports = {}


  // TODO(hbt) modify this to work like getByIds
  exports.getById = function(id)
  {
    var ret = null

    // check collection
    if(this.global._byId[id])
    {
      ret = this.global._byId[id]
    }
    else
    {
      // TODO(hbt) add test to retrieve tasks by id for filtering
      // TODO(hbt) make sure metadata is fully initialized as this will created new references
      var json = this.localStorage.find({id: id})
      var model = new this.model(json)
      this.global.add(model)
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
    var isModelWithId = model instanceof this.model && model.get('id');
    var isJSONWithId = _.isObject(model) && model.id
    if(model && (isModelWithId || isJSONWithId))
    {
      var id = (isModelWithId && model.get('id')) || (isJSONWithId && model.id)
      ret = this.global.getById(id)
    }
    else
    {
      // create it in the global collection to track the reference
      ret = Backbone.Collection.prototype.create.apply(this.global, [model, options])
    }

    // add it to the current collection
    // Note(hbt) this will not add it twice to the global collection -- backbone collections contain unique references
    this.add(ret, options)

    return ret
  }


  /**
   * create a global reference for all collections
   * @param CollClass (optional)
   * @return {*}
   */
  exports.createGlobalCollection = function(CollClass)
  {
    var prototype = (CollClass && CollClass.prototype) || this
    var Constructor = CollClass || this.constructor

    if(!prototype.global)
    {
      prototype.global = new Constructor()
    }

    return prototype.global
  }

  return exports
})