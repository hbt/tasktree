define([], function()
{
  var CaptureViewModel = kb.ViewModel.extend({
    constructor: function(model)
    {
      var Model = window.App.models['Task']
      model = new Model({content: ''})

      kb.ViewModel.prototype.constructor.call(this, model);
      return this;
    },

    create: function()
    {
      // TODO(hbt) implement
      console.log(this.model().get('content'))
      this.model().set('content', '')
      console.log('ss', arguments, this)
    }
  });

  // TODO(hbt) refactor to use App.vm
  window.CaptureViewModel = CaptureViewModel

  return CaptureViewModel
})