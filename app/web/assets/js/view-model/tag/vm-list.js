define([], function()
{
  var ListViewModel = kb.ViewModel.extend({
    constructor: function()
    {
      var tags = App.collections.Tags.global
      tags.fetch()

      this.tags = kb.collectionObservable(tags)

      return this;
    },

    hasTags: function()
    {
      return true
    }
  });


  window.App.vm.TagsList = ListViewModel
  return window.App.vm.TagsList})