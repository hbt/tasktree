define([], function()
{
  var ListViewModel = kb.ViewModel.extend({
    constructor: function()
    {
      var tags = App.collections.Tags


      this.tags = kb.collectionObservable(tags, {
        view_model: kb.ViewModel.extend({

          constructor: function()
          {
//            this.ww = ko.observable(model.getTasks().length)
//
//            var self = this
//            model.on('sync', function()
//            {
//              self.ww(this.getTasks().length)
//            })
//
//            this.ff = ko.computed(function()
//            {
//              return this.ww()
//              return model.getTasks().length
//              if(model.getTasks().length)
//              {
////                return App.collections.Tasks.at(0).get('content')
//              }
//            }, this)

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