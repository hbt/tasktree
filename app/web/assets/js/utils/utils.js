define([], function()
{
  var exports = {}


  exports.guid = function()
  {
    // Generate four random hex digits.
    function S4()
    {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    // Generate a pseudo-GUID by concatenating random hexadecimal.
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
  }


  exports.findTag = function(name)
  {
    var coll = App.store.getCollection(App.models.Tag)
    var tag = coll.where({content: name})
    tag = tag && _.isArray(tag) && tag[0] || null

    return tag
  }


  return exports
})
