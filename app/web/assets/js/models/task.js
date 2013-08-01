define(['utils/tags', 'mixins/backbone-model-helpers', 'utils/schema'], function(TagUtils, ModelHelpers, schema)
{
  var Model = Backbone.RelationalModel.extend({
    database:  schema,
    storeName: 'tasks',
    modelName: 'Task',
    // TODO(hbt) Refactor (high): add relations + lazy load them + handle many to many
    relations: [
      {
        type:            Backbone.HasMany,
        key:             'children',
        relatedModel:    'App.models.Task',
        collectionType:  'App.collectionClasses.Tasks',
        includeInJSON:   'id',
        reverseRelation: {
          key:           'parent',
          includeInJSON: 'id',
          // TODO(hbt) remove and verify this if this needed. issues were created when added for other relation
          autoFetch:     true,
          type:          Backbone.HasOne
        }
      },

//      {
//        type:            Backbone.HasMany,
//        key:             'tags',
//        relatedModel:    'App.models.Tag',
//        collectionType:  'App.collectionClasses.Tags',
//        includeInJSON:   'id',
//        autoFetch:       true,
//        reverseRelation: {
//          key:           'tasks',
//          includeInJSON: 'id',
//          type:          Backbone.HasMany
//        }
//      }

//      {
//        type:            Backbone.HasMany,
//        key:             'tags',
//        relatedModel:    'App.models.TagTask',
//        includeInJSON:   'id',
//        autoFetch: 1,
////        autoFetch:       true,
//        reverseRelation: {
//          key:           'tasks',
////          includeInJSON: 'id',
////          type:          Backbone.HasMany
//        }
//      }

    ],
    defaults:  function()
    {
      return {
        content: ''
      }
    },


    /**
     * converts inline tags in the content to actual tags then removes them from the content
     */
    handleInlineTags: function()
    {
      // extract inline tags
      var content = this.get('content')
      var tags = TagUtils.extract(content)


      // associate tags
      _.each(_.unique(tags), function(tag)
      {
        var otag = App.models.Tag.prototype.global.create({content: tag});
        this.get('tags').add(otag)
      }, this)


      // prevent recursive calls
      this.save(null, {skipPostSave: true})
    }
  })


  _.extend(Model.prototype, ModelHelpers)


  window.App.models['Task'] = window.App.models['Task'] || Model
  return window.App.models['Task']
})