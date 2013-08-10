define(['utils/tags', 'utils/schema'], function(TagUtils, schema)
{
  var Model = Backbone.RelationalModel.extend({
    database:  schema,
    storeName: 'tasks',
    modelName: 'Task',
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
          key:           'task',
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

    hasTag: function(tag)
    {
      var content = _.isString(tag) && tag || tag.get('content')
      return this.getTags().length && _.contains(this.getTags().pluck('content'), content) || false
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

      var otags = _.map(tags, function(v)
      {
        var tag = _.isString(v) && v || v instanceof App.models.Tag && v.get('content')
        return TagUtils.findOrCreateByContent(tag)
      })

      // add tags if not already present
      _.each(otags, function(otag)
      {
        if(!this.hasTag(otag))
        {
          this.get('taskstags').add({tag: otag})
        }
      }, this)


      // only save if there is a new tag
      var nids = this.getTags().pluck('id')
      if(!skipSave && _.difference(nids, ids).length > 0)
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
        return v.get('tag')
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

      if(tags)
      {
        this.tag(tags, true)

        content = _.filter(_s.words(content),function(v)
        {
          return !_s.startsWith(v, '#')
        }).join(' ')

        this.set('content', content)
      }
    }
  })


  window.App.models['Task'] = window.App.models['Task'] || Model
  return window.App.models['Task']
})