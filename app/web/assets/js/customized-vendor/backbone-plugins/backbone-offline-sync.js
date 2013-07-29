define([], function()
{
  // Note(hbt) deprecated -- uses local storage
  // TODO(hbt) Refactor (low): remove this and use indexeddb


//
//  var Module = {
//    localSync: null,
//
//    init: function()
//    {
//      Module.localSync = Backbone.localSync
//      Backbone.localSync = Module.sync
//    },
//
//    DirtyStorage: {
//      getName: function(model)
//      {
//        var Model = null
//        if(_.isFunction(model))
//        {
//          Model = model
//        }
//        else
//        {
//          Model = App.models[model.modelName]
//        }
//
//        return Model.prototype.localStorage.name + '-dirty'
//      },
//
//      flag: function(method, model)
//      {
//        var data = this.getFlagged(model)
//
//        data.push({
//          method: method,
//          id:     model.get('id')
//        })
//
//        this.setFlagged(model, data)
//      },
//
//      getFlagged: function(model)
//      {
//        return JSON.parse(localStorage[this.getName(model)] || '[]')
//      },
//
//      setFlagged: function(model, data)
//      {
//        localStorage[this.getName(model)] = JSON.stringify(data)
//      }
//    },
//
//    /**
//     * syncs locally first
//     * marks data as dirty
//     * then syncs remotely (pushes dirty data).
//     *
//     * if we cannot push, next time there is a connection, a push is triggered
//     * @param method
//     * @param model
//     * @param options
//     */
//    sync: function(method, model, options)
//    {
//      Module.localSync.call(this, method, model, options)
//
//      if(_.contains(['create', 'update', 'delete'], method))
//      {
//        Module.DirtyStorage.flag(method, model)
//        Module.push()
//      }
//    },
//
//    /**
//     * gets dirty records of all models
//     * pushes the data (if possible)
//     */
//    push: function()
//    {
////      _.each(App.models, function(Model)
////      {
////        var records = Module.DirtyStorage.getFlagged(Model)
////        _.each(records, function(record)
////        {
////          // do not retrieve if the operation is a delete
////          var json = {id: record.id}
////          if(record.method !== 'delete')
////          {
////            var model = Model.prototype.global.findBy(record.id)
////            json = model && model.toJSON()
////          }
////        })
////      })
//    }
//
//  }
//
//  return Module
})