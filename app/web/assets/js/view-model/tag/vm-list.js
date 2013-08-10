define([], function()
{
  var ListViewModel = kb.ViewModel.extend({
    constructor: function()
    {
      var tags = Backbone.Relational.store.getCollection(App.models.Tag, true)


      this.tags = kb.collectionObservable(tags, {
        view_model: kb.ViewModel.extend({

          constructor: function(model)
          {
            var self = this

            this.getTasks = ko.observable(model.getTasks())
            model.on('sync', function()
            {
              self.getTasks(this.getTasks())
            })


            kb.ViewModel.prototype.constructor.apply(this, arguments)
          }
        })

      })


      return this;
    }
  });


  window.App.vm.TagsList = ListViewModel
  return window.App.vm.TagsList
})