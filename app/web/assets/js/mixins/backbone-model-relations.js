
/**
 * @deprecated
 * using backbone relational for now
 * look into git://github.com/dhruvaray/backbone-associations.git -- apparently it is more optimal
 */

define([], function()
{

  var Relation = {
    types: {
      OneMany:  'one_to_many',
      ManyMany: 'many_to_many'
    },

    /**
     * sets the default value using the defined relations
     * @param Model
     * @param key
     * @param type
     * @param isReverse
     */
    setDefaults: function(Model, key, type, isReverse)
    {
      // get existing defaults -- must be a function
      var defaults = Model.prototype.defaults()

      // do we already have a default for this key?
      if(_.isUndefined(defaults[key]))
      {
        // overwrite existing defaults function
        // Note(hbt) this is necessary to prevent it from returning the same reference e.g for arrays
        Model.prototype.defaults = _.wrap(Model.prototype.defaults, function(func)
        {
          var ret = func()

          // determine the default value
          var defaultValue = null

          if(type === Relation.types.ManyMany || (type === Relation.types.OneMany && !isReverse))
          {
            defaultValue = []
          }

          ret[key] = defaultValue

          return ret
        })
      }
    },


    /**
     * @returns collection of parsed models
     */
    parseValue: function(Model, value)
    {
      var self = this
      var ret = null


      if(value instanceof Backbone.Model)
      {
        ret = value.global._byId[value.get('id')]
      }
      else if(_.isArray(value))
      {
        var values = []
        _.each(value, function(v)
        {
          var obj = self.parseValue(Model, v)

          // throw error if not a model
          if(!(obj instanceof Backbone.Model))
          {
            throw new Error('Could not parse ' + v + ' expected Backbone.Model and got ' + obj)
          }
          values.push(obj)
        })

        ret = values
      }

      return ret
    },

    /**
     * transforms the value based on the type of relationship
     *
     * @param Model
     * @param value parsed value
     * @param type relationship
     *
     * @returns {*} collection or model
     */
    transformValue:  function(Model, value, type)
    {
      var ret = value

      // transform to collection
      if(type === Relation.types.ManyMany)
      {
        var CollectionConstructor = Model.prototype.global.constructor
        if(value instanceof Backbone.Model)
        {
          ret = new CollectionConstructor([value])
        }
        // array of models (parsed)
        else if(_.isArray(value))
        {
          ret = new CollectionConstructor(value)
        }
      }
      else if(type === Relation.types.OneMany)
      {

      }


//      // verify
//      if(!(ret instanceof Backbone.Model) && !(ret instanceof Backbone.Collection))
//      {
//        throw new Error("Could not transform the value into an acceptable return value (model or collection). Value is: " + value)
//      }

      return ret
    },


    // TODO(hbt) Refactor (high): rename name to field + comment
    overwriteGetSet: function(Model, name, type, reverseName)
    {
      // get/set prototype bak ori
      var bSetFunc = Model.prototype.set
      var self = this

      Model.prototype.getRaw = function(attr)
      {
        return Backbone.Model.prototype.get.call(this, attr)
      }

      Model.prototype.set = function(key, value, options)
      {
        var attrs

        // Handle both `'key', value` and `{key: value}` -style arguments.
        if(_.isObject(key) || key == null)
        {
          attrs = key;
          options = value;
        }
        else
        {
          attrs = {};
          attrs[key] = value;
        }

        options = options || {}


        // extract opts
        var ignoreRelated = options.ignoreRelated

        // are we trying to set a relational value?
        if(!_.isUndefined(attrs[name]))
        {
          var parsedValue = self.parseValue(Model, attrs[name])
          parsedValue = self.transformValue(Model, parsedValue, type)


          // get current list of ids

          // diff

          // remove

          // add

          // save new list

          // TODO(hbt) Refactor (high): refactor too long
//          self.saveRelated(parsedValue)
          // verify models have this object as a relation i.e call add or set depending on relation
          var _this = this
          if(parsedValue instanceof Backbone.Collection)
          {
//            var cids = this.getRaw(name)
            var coll = parsedValue
//            console.log(cids, coll.pluck('id'))

            if(!ignoreRelated)
            {
              coll.each(function(v)
              {
                // TODO(hbt) Refactor (low): consider changing this to a "set" and then trigger a save when we save the model
                // TODO(hbt) Refactor (low): use findById
                v.save(reverseName, [_this.global._byId[_this.get('id')]], {ignoreRelated: true, success: null})
              })
            }

            var ids = _.unique(coll.pluck('id'))
            attrs[name] = ids
          }
        }


        // call original
        bSetFunc.call(this, attrs, options)
      }

    },

    setup: function(models)
    {
      var self = this
      _.each(models, function(Model)
      {
        if(_.isFunction(Model.prototype.relations))
        {
          // setup defaults i.e tasks in tag
          _.each(Model.prototype.relations(), function(relation)
          {
            self.setDefaults(Model, relation.key, relation.type, false)
            self.setDefaults(relation.model, relation.reverseRelation.key, relation.type, true)

            self.overwriteGetSet(Model, relation.key, relation.type, relation.reverseRelation.key)
            self.overwriteGetSet(relation.model, relation.reverseRelation.key, relation.type, relation.key)
          })
        }

        // TODO(hbt) Feature: generate setters/getters
      })
    }
  }

  Backbone.Model.Relation = Relation


})