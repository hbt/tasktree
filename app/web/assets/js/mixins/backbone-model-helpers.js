define([], function()
{
  var exports = {}


  /**
   * provide models with an id instead of waiting for a callback from the db with one
   */
  exports.initialize = function()
  {
    if(this.isNew())
    {
      this.set('id', App.utils.guid())
    }

    Backbone.Model.prototype.initialize.call(this, arguments);
  }

  return exports
})