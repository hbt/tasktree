define([], function()
{

  var Relation = {
    types: {
      OneMany:  'one_to_many',
      ManyMany: 'many_to_many'
    },

//    addHelpers: function(Model)
//    {
//      var bset = Backbone.Model.prototype.set
//      var bget = Backbone.Model.prototype.get
//
//      Model.prototype.set = function(attrs, options)
//      {
//        // are we trying to set a relational value?
//        if(1)
//        {
//          // throw error if not saved -- must have an id
//
//
//          // parse value
//
//          // is array
//          if(1)
//          {
//            // loop
//            {
//              // is a Model?
//              {
//
//              }
//
//            }
//          }
//
//
//          // collection of saved models where models are parsed value
//
//          // verify models have this object as a relation i.e call add or set depending on relation
//
//          // pluck ids
//
//
//          // set tags = ids
//
//
//        }
//
//        // normal call
//      }
//
//      console.log(Model)
//    },
//

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
            self.setDefaults(relation.model, relation.reverse_relation.key, relation.type, true)
          })

          // generate setters/getters

        }
      })
    }

//    setup: function(models)
//    {
//      _.each(models, function(model)
//      {
//        // create add/remove functions
//
//        // is one to many?
//        if(true)
//        {
//          // create add/remove collection helpers in one direction
//        }
//
//
//        // is many to many?
//        if(true)
//        {
//          // create add/remove in both directions
//        }
//
//        //
//        console.log(model.prototype.modelName)
//
//        // write flexible parser to handle
//        /**
//         * - array
//           * - unique
//           * - json
//           * - models
//         * - collection
//         */
//
//        // overwrite set/get
//
//
//        // set
//
//        // is special field?
//        if(true)
//        {
//          // parse
//
//          // extract ids
//
//          // call backbone set
//        }
//
//        // task.set('tags', [model1, model2])
//
//        //
//      })
//    }
  }

  Backbone.Model.Relation = Relation


})