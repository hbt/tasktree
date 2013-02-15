define([], function()
{
  var exports = {}

  /**
   * reset global references
   */
  exports.clearGlobalCollections = function()
  {
    _.each(window.App.collectionClasses, function(Coll)
    {
      Coll.prototype.global = null;
      Coll.prototype.createGlobalCollection()
    })
  }

  return exports
})