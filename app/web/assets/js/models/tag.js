define(['utils/schema'], function(schema)
{
  var Model = Backbone.RelationalModel.extend({
    database:  schema,
    storeName: 'tags',
    modelName: 'Tag',

    defaults: function()
    {
      return {
        content: ''
      }
    },

    relations: [
      {
        type:            Backbone.HasMany,
        key:             'taskstags',
        relatedModel:    'App.models.TasksTags',
        collectionType:  'App.collectionClasses.TasksTags',
        reverseRelation: {
          key:           'tag',
          includeInJSON: 'id'
        }
      }
    ],


    getTasks: function(filters)
    {
      var ret = _.map(this.toJSON()['taskstags'], function(v)
      {
        return v['task']
      })


      // filter results further with other tags
      filters = filters && (_.isArray(filters) && filters) || (_.isString(filters) && [filters]) || null
      _.each(filters, function(v)
      {
        // find filter
        var tag = App.utils.findTag(v)

        if(!tag)
        {
          return
        }

        var ids = tag.getTasks()
        if(ids.length)
        {
          ret = _.intersection(ret, ids)
        }
      })


      ret = _.unique(ret)

      // remove null records -- bug in backbone relational? -- null in the JSON
      ret = _.filter(ret, function(v)
      {
        return v !== null
      })


      return ret
    }
  })


  window.App.models['Tag'] = window.App.models['Tag'] || Model

  return window.App.models['Tag']

})