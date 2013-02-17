(function()
{
  var setFunction = Backbone.Model.prototype.set
  var getFunction = Backbone.Model.prototype.get

  _.extend(Backbone.Model.prototype, {

    get: function(attr)
    {
      // Call the getter if available
      if(_.isFunction(this.getters[attr]))
      {
        return this.getters[attr].call(this);
      }

      return getFunction.call(this, attr);
    },

    set: function(key, value, options)
    {
      var attrs, attr;

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

      // Go over all the set attributes and call the setter if available
      for(attr in attrs)
      {
        if(_.isFunction(this.setters[attr]))
        {
          attrs[attr] = this.setters[attr].call(this, attrs[attr]);
        }
      }

      return setFunction.call(this, attrs, options);
    },

    getters: {},

    setters: {}

  })
}())
