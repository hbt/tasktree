define(['backbone'], function()
{
  var exports = {}


  /**
   * provide models with an id instead of waiting for a callback from the db with one
   */
  exports.initialize = function()
  {
    if(this.isNew() && this.storeName)
    {
      this.set('id', App.utils.guid())
    }
  }


  var saveBak = Backbone.Model.prototype.save
  /**
   * only meant to be used internally. So no need to support the val/options ala backbone
   * @param key
   * @param val
   * @param options
   */
  exports.save = function()
  {
    this.trigger('pre-save')

    return saveBak.apply(this, arguments);
  }


  return exports
})