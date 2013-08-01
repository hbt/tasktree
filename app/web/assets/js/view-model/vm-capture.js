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
      var task = new Task()
      task.set('content', model.get('content'))
      task.save()
      App.collections.Tasks.add(task, {at: 0})


      // clear
      this.model().set('content', '')
    }
  });


  window.App.vm.Capture = CaptureViewModel
  return CaptureViewModel
})