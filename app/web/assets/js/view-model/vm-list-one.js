define([], function()
{
  var ListOneViewModel = kb.ViewModel.extend({
    save: function()
    {
      this.model().save()
    }

  })


  window.App.vm.ListOne = ListOneViewModel
  return window.App.vm.ListOne
})