define(['view-model/vm-list-one'], function(ListOneViewModel)
{
  var ListViewModel = kb.ViewModel.extend({
    constructor: function()
    {
      var tasks = App.collections.Tasks.global
      tasks.fetch()

      this.tasks = kb.collectionObservable(tasks, {
        view_model: ListOneViewModel
      })

      // sort by collection index
      this.tasks.comparator(
        function(obj1, obj2)
        {
          var m1 = obj1.__kb.object, m2 = obj2.__kb.object
          return tasks.indexOf(m1) < tasks.indexOf(m2) ? 1 : -1
        }
      );


      return this;
    },

    hasTasks: function()
    {
      return true
    }
  });


  window.App.vm.List = ListViewModel
  return window.App.vm.List
})