define(['utils/tags', 'utils/schema'], function(TagUtils, schema)
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
          autoFetch:     true,
          type:          Backbone.HasOne
        }
      },
      {
        type:            Backbone.HasMany,
        key:             'taskstags',
        relatedModel:    'App.models.TasksTags',
        collectionType:  'App.collectionClasses.TasksTags',
        reverseRelation: {
          key:           'tasks',
          includeInJSON: 'id'
        }
      }
    ],
    defaults:  function()
    {
      return {
        content: ''
      }
    },


    initialize: function()
    {
      this.on('pre-save', this.handleInlineTags)

      return Backbone.Model.prototype.initialize.apply(this, arguments);
    },


    /**
     *
     * @param tag tag can be an array of strings or tag models
     * @param skipSave  - false by default
     */
    tag: function(tag, skipSave)
    {
      // transform
      var tags = _.isArray(tag) && tag || [tag]
      skipSave = skipSave || false

      var ids = this.getTags().pluck('id')

      // add tags
      _.each(tags, function(v)
      {
        var tag = _.isString(v) && v || v instanceof App.models.Tag && v.get('content')
        var otag = TagUtils.findOrCreateByContent(tag)

        // TODO(hbt) deal with duplicates in taskstags
        this.get('taskstags').add({tags: otag})
      }, this)


      // only save if there is a new tag
      var nids = this.getTags().pluck('id')
      if(_.difference(nids, ids).length > 0 && !skipSave)
      {
        this.save()
      }
    },

    untag: function()
    {
      throw new Error('Not implemented yet')
    },

    getTags: function()
    {
      var coll = new App.collectionClasses.Tags()
      var tags = this.get('taskstags').map(function(v)
      {
        return v.get('tags')
      })

      // reset + filters out duplicates -- use groupby if mistaken
      coll.reset(tags)

      return coll

    },

    /**
     * converts inline tags in the content to actual tags then removes them from the content
     */
    handleInlineTags: function()
    {
      // extract inline tags
      var content = this.get('content')
      var tags = TagUtils.extract(content)

      this.tag(tags, true)
    }
  })


  window.App.models['Task'] = window.App.models['Task'] || Model
  return window.App.models['Task']
})