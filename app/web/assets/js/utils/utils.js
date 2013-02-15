_.events = {}
_.extend(_.events, Backbone.Events);

_.mixin({
  copy: function(object)
  {
    return jQuery.extend(true, {}, object)
  }
})
