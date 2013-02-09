define(['./models/mixins', './views/list',
  './collections/tags'], function(ModelMixins, ListView)
{
  /**
   * alphanumerical + underscores and dashes as separators
   * @param word
   * @return {Boolean}
   */
  function isValid(word)
  {
    var v = word && _s.startsWith(word, '#') && word.substring(1)

    // accept multiple dashes and underscores
    return v.split('-').join('_').match(/^\w+$/) !== null
  }

  // TODO(hbt) abstract this into its own file -- model functions
  function extract(content)
  {
    var ret = []
    var words = content.split(' ')
    _.each(words, function(word)
    {
      if(word.trim().length === 0)
      {
        return;
      }

      if(_s.startsWith(word, '#') && isValid(word))
      {
        ret.push(word.substring(1))
      }
    })

    return ret
  }


  new ListView()
  _.events.on('app-init', function()
  {

    _.extend(window.App.models.Info.prototype, ModelMixins)

    // TODO(hbt) abstract this into its own file -- model functions
    _.events.on('model-info-init', function(newModel)
    {
      newModel.on('change', function(model)
      {
        var hasIdAndTags = !model.isNew() && model.get('content').indexOf('#') !== -1
        if(hasIdAndTags)
        {
          var tags = extract(model.get('content'))
          model.addTags(tags)
        }
      })
    })
  })

  var exports = {
    mixins: [ModelMixins],
    views:  [ListView]
  }

  return exports

})