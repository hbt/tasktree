define([], function()
{

  var helpers = {}

  var exports = {}

  exports.helpers = helpers

  /**
   * use to initialize collection classes
   * @param Class backbone collection
   */
  exports.extend = function(Class)
  {
    // add helpers
    _.extend(Class.prototype, helpers)


    // initialize global collection
    var prototype = Class && Class.prototype
    var Constructor = Class

    if(!prototype.global)
    {
      prototype.global = new Constructor()

      // link the global collection into the model for easier referencing
      prototype.model.prototype.global = prototype.global
    }
  }

  return exports
})