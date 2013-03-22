define(['utils/tags', 'mixins/backbone-model-helpers'], function(TagUtils, ModelHelpers)
{
  var Model = Backbone.RelationalModel.extend({
    modelName:    'Task',
    localStorage: new Backbone.LocalStorage(window.App.config.namespace + 'tasks'),
    relations:    [
      function()
      {
        return {
          type:            Backbone.HasMany,
          key:             'children',
          relatedModel:    App.models.Task,
          collectionType:  App.collectionClasses.Tasks,
          includeInJSON:   'id',
          autoFetch:       true,
          reverseRelation: {
            key:           'parent',
            includeInJSON: 'id',
            // TODO(hbt) remove and verify this if this needed. issues were created when added for other relation
            autoFetch:     true,
            type:          Backbone.HasOne
          }
        }
      },
      function()
      {
        return {
          type:            Backbone.HasMany,
          key:             'tags',
          relatedModel:    App.models.Tag,
          collectionType:  App.collectionClasses.Tags,
          includeInJSON:   'id',
          autoFetch:       true,
          reverseRelation: {
            key:           'tasks',
            includeInJSON: 'id',
            type:          Backbone.HasMany
          }
        }
      }
    ],
    defaults:     function()
    {
      return {
        content: ''
      }
    },

    initialize: function()
    {
      this.on('post-save', this.handleInlineTags, this)
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