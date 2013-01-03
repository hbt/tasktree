define([], function()
{

  var exports = {}

  /**
   * accepts Array of tags or String or json
   * @param tags
   */
  exports.addTags = function(tags)
  {
    // TODO(hbt) cannot tag tags -- for now, do allow tags to have metadata
    if(this.get('isMetadata'))
    {
      return;
    }

    var tag = null

    // TODO(hbt) simplify addMetada should handle strings as well as json
    if(_.isArray(tags))
    {
      _.each(tags, this.addTags, this)
      return null
    }
    else if(_.isString(tags))
    {
      tag = {content: tags}
    }
    else if(_.isObject(tags) && tags.content)
    {
      tag = tags
    }

    this.addMetadata(tag, 'Tags')
  }

  exports.getTags = function()
  {
    // TODO(hbt) getMetadata should accept custom collection + modify addMetada & removeMetadata & inv children
    return this.getMetadata('Tags')
  }

  exports.removeTags = function(tags)
  {
    this.removeMetadata(tags, 'Tags')
  }

  return exports
})