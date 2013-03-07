define([], function()
{
  var exports = {}

  /**
   * generates set/get functions for Model using fields from defaults
   * @param ModelClass
   */
  exports.generateGettersSetters = function(ModelClass)
  {
    var defaults = ModelClass.prototype.defaults
    defaults = (_.isFunction(defaults) && defaults()) || defaults || {}


    _.each(_.keys(defaults), function(field)
    {
      var setMethod = _s.camelize('set_' + field)
      var getMethod = _s.camelize('get_' + field)

      // are set/get functions already defined?
      if(ModelClass.prototype[setMethod] !== undefined || ModelClass.prototype[getMethod] !== undefined)
      {
        throw new Error('Backbone getters setters generator: cannot generate getters and setters for field ' + field + ' from model ' + ModelClass)
      }


      // set
      ModelClass.prototype[setMethod] = function(key, value, options)
      {
        var attrs

        // Normalize the key-value into an object
        if(_.isObject(key) || key == null)
        {
          attrs = key;
          options = value;
        }
        else
        {
          attrs = {};
          attrs[key] = value;
        }

        return Backbone.Model.prototype.set.call(this, attrs, options);
      }


      // get
      ModelClass.prototype[getMethod] = function()
      {
        return Backbone.Model.prototype.get.call(this, field)
      }
    })
  }

  return exports
})