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

      var CollectionConstructor = Model.prototype.global.constructor

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

        ret = new CollectionConstructor(values)
      }

      return ret
    },


    overwriteGetSet: function(Model, name, reverseName)
    {
      // get/set prototype bak ori
      var bSetFunc = Model.prototype.set
      var self = this


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
          var coll = self.parseValue(Model, attrs[name])

          // verify models have this object as a relation i.e call add or set depending on relation
          var _this = this
          if(coll instanceof Backbone.Collection)
          {
            if(!ignoreRelated)
            {
              coll.each(function(v)
              {
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

            self.overwriteGetSet(Model, relation.key, relation.reverseRelation.key)
            self.overwriteGetSet(relation.model, relation.reverseRelation.key, relation.key)
          })
        }

        // TODO(hbt) Feature: generate setters/getters
      })
    }
  }

  Backbone.Model.Relation = Relation


})