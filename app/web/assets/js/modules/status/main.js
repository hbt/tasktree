define(['./model/mixins'], function(ModelMixins)
{
  _.events.on('app-init', function()
  {
    _.extend(window.App.models.Info.prototype, ModelMixins)

    // TODO(hbt) abstract this into its own file -- model functions
    _.events.on('model-info-init', function(newModel)
    {
      newModel.on('change', function(model)
      {
        var tags = model.getTags()

        if(tags.length === 0 || (!model.isDone() && !model.isUndone()))
        {
          model.addTags('undone')
        }

      })
    })
  })

  var exports = {
    mixins: [ModelMixins]
  }

  return exports

})