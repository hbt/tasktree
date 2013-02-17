define(['models/task', 'services/msg'], function(Task, Msg)
{
  var CaptureViewModel = kb.ViewModel.extend({
    constructor: function()
    {
      var model = new Task()

      kb.ViewModel.prototype.constructor.call(this, model);
      return this;
    },

    create: function()
    {
      var model = this.model()


      // empty string?
      if(model.get('content').trim() === '')
      {
        return Msg.error('Nothing to capture -- empty content')
      }


      // create
      model.global.create(model.toJSON())


      // clear
      this.model().set('content', '')
    },

    hasFocus: true
  });


  window.App.vm.Capture = CaptureViewModel
  return CaptureViewModel
})