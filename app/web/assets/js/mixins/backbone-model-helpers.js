define([], function()
{
  var exports = {}

  exports.getRawJSON = function()
  {
    return JSON.parse(localStorage[this.localStorage.name + '-' + this.get('id')])
  }

  return exports
})