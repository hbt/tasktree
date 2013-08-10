define([], function()
{
  var ListOneViewModel = kb.ViewModel.extend({
    save: function()
    {
      this.model().save()

      return true
    }

  })


  window.App.vm.ListOne = ListOneViewModel
  return window.App.vm.ListOne
})