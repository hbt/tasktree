define([], function()
{

  var exports = {}

  exports.toggleDone = function()
  {
    var done = this.isDone()
    this.removeTags(done ? 'done' : 'undone')
    this.addTags(done ? 'undone' : 'done')
  }

  exports.isDone = function()
  {
    return _.contains(this.getTags().pluck('content'), 'done')
  }

  exports.isUndone = function()
  {
    return _.contains(this.getTags().pluck('content'), 'undone')
  }

  return exports
})