define([], function()
{
  var exports = {}
  /**
   * alphanumerical + underscores and dashes as separators
   * @param word
   * @return {Boolean}
   */
  exports.isValid = function(word)
  {
    var v = word && _s.startsWith(word, '#') && word.substring(1)

    // accept multiple dashes and underscores
    return v.split('-').join('_').match(/^\w+$/) !== null
  }

  /**
   * extracts tags from string and returns array of tags (as strings)
   * @param content
   * @returns {Array}
   */
  exports.extract = function(content)
  {
    var ret = []
    var words = content.split(' ')
    _.each(words, function(word)
    {
      if(word.trim().length === 0)
      {
        return;
      }

      if(_s.startsWith(word, '#') && exports.isValid(word))
      {
        ret.push(word.substring(1))
      }
    })


    return _.unique(ret)
  }


  /**
   *
   * @param content
   * @returns {boolean|*|App.models.Tag|*}
   */
  exports.findOrCreateByContent = function(content)
  {
    // find
    var tag = Backbone.Relational.store.getCollection(App.models.Tag).findWhere({content: content})

    // create if not found
    if(!tag)
    {
      tag = new App.models.Tag({
        content: content
      })
      tag.save()
    }

    return tag
  }

  return exports
})