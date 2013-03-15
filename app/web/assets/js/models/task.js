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
            autoFetch:     true,
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
      var cleanContent = content
      var tags = TagUtils.extract(content)


      // clear the content of tags -- why? when tags are removed using UI, they are not added again when saving the content
      _.each(tags, function(tag)
      {
        // tags in the middle
        cleanContent = cleanContent.replace('#' + tag + ' ', '')

        // remove tags at the end
        cleanContent = cleanContent.replace('#' + tag, '')
      })

      this.set('content', cleanContent)
      tags = _.unique(tags)


      // associate tags
      _.each(tags, function(tag)
      {
        var otag = App.models.Tag.prototype.global.create({content: tag});
        this.get('tags').add(otag)
      }, this)

      this.save(null, {silent: true})
    }
  })


  _.extend(Model.prototype, ModelHelpers)


  window.App.models['Task'] = window.App.models['Task'] || Model
  return window.App.models['Task']
})