define([], function()
{

  /**
   * Unique constraint is used to prevent duplicated entries
   * Example: Tags' content should be unique. Therefore creating two tags with the same content should
   * return the same reference
   * and only one tag should be created
   *
   * @type {{isDefined: Function, lookup: Function}}
   */
  var UniqueConstraint = {
    /**
     * @param collection
     * @return (boolean) is unique constraint defined or not
     */
    isDefined: function(collection)
    {
      return collection.unique
    },


    /**
     * creates/updates the unique index if needed
     * @param modelCollection -- determined dynamically if it a model or collection
     */
    refreshIndex: function(modelCollection)
    {
      var isModel = (modelCollection instanceof Backbone.Model)
      var isCollection = (modelCollection instanceof Backbone.Collection)

      var model = (isModel && modelCollection) || undefined
      var collection = (isCollection && modelCollection) || (isModel && modelCollection.global);
      var indexName = collection.unique

      // initialized?
      if(collection.global._byUnique === undefined)
      {
        collection.global._byUnique = {}
        collection.global._byUnique[indexName] = {}
      }

      var uniqueIndex = collection.global._byUnique[indexName]

      // is index out of date? -- new / removed models
      if(collection.global.length !== _.size(uniqueIndex))
      {
        // clear
        collection.global._byUnique[indexName] = {}
        uniqueIndex = collection.global._byUnique[indexName]

        // build index
        collection.global.each(function(v)
        {
          uniqueIndex[v.get(indexName)] = v
        })
      }

      // did the indexed value change?
      if(model && model.changed && _.has(model.changed, indexName) && _.has(model._previousAttributes, indexName))
      {
        // remove old & index new value
        var oldvalue = model._previousAttributes[indexName];
        delete uniqueIndex[oldvalue]
        uniqueIndex[model.get('content')] = model
      }
    },

    /**
     * look up the object by unique field -- to use the same reference and not create a new object
     * @param collection
     * @param value
     * @return object reference from global
     */
    lookup: function(collection, model, autoFetch)
    {
      var ret = null
      var value = (model instanceof Backbone.Model && model.get(collection.unique)) || (_.isObject(model) && model[collection.unique])

      if(!value)
      {
        throw new Error('Unique constraint ' + collection.unique + ' failed:  value passed in ' + model + ' in collection ' + collection)
      }


      this.refreshIndex(collection)


      // is reference present in global?
      ret = collection.global._byUnique[collection.unique][value]
      if(!ret)
      {

        // fetch -- to make sure we have the latest references loaded in global
        if(autoFetch)
        {
          collection.global.fetch()

          // look up again
          ret = this.lookup(collection, model, false)
        }
      }


      return ret
    }


  }


  var helpers = {}

  var oBackboneCollectionCreate = Backbone.Collection.prototype.create

  helpers.findBy = function(id)
  {
    var ret = null
    if(this.global._byId[id])
    {
     ret = this.global._byId[id]
    }
    else
    {
      var model = this.localStorage.find({id: id})
      if(model)
      {
        this.global.add(model)
        ret = this.global.findBy(model.id)
      }
    }

    return ret
  }

  /**
   * overwrites Backbone.Collection.prototype.create
   *
   * - prevents duplicated content (uses unique constraint)
   * - prevents duplicated references if model has an ID
   *
   * in case of duplicates, returns reference from global collection
   *
   * calls original backbone collection at the end
   *
   * @param model
   * @param options
   */
  helpers.create = function(model, options)
  {
    var obj = null

    // lookup by unique field
    if(UniqueConstraint.isDefined(this))
    {
      obj = UniqueConstraint.lookup(this, model, true)
    }


    // TODO(hbt) Feature: lookup by ID


    // reference not found? create it in global
    if(!obj)
    {
      obj = oBackboneCollectionCreate.call(this.global, model, options)
    }


    // add it to the current collection
    if(this !== this.global)
    {
      this.add(obj, options)
    }


    return obj
  }

  var exports = {}

  exports.helpers = helpers

  /**
   * use to initialize collection classes
   * @param Class backbone collection
   */
  exports.extend = function(Class)
  {
    // add helpers
    _.extend(Class.prototype, helpers)


    // initialize global collection
    var prototype = Class && Class.prototype
    var Constructor = Class

    if(!prototype.global)
    {
      prototype.global = new Constructor()

      // link the global collection into the model for easier referencing
      prototype.model.prototype.global = prototype.global


      _.each(['add', 'change', 'destroy', 'reset', 'remove'], function(eventName)
      {
        prototype.global.on(eventName, UniqueConstraint.refreshIndex)
      })
    }
  }

  return exports
})