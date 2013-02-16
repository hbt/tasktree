define([], function()
{
  var CaptureViewModel = kb.ViewModel.extend({
    constructor: function(model)
    {
      // TODO(hbt) remove + refactor
      var Model = window.App.models['Task']
      if(!model)
      {
        model = new Model({content: ''})
      }

      kb.ViewModel.prototype.constructor.call(this, model);

      // TODO(hbt) consider using kb-inject
      ko.applyBindings(this, $('#capture-container')[0])
      return this;
    },

    create: function()
    {
      // TODO(hbt) implement
    }
  });

  return CaptureViewModel
})