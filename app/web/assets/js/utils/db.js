define([], function()
{
  var exports = {}

  /**
   * delete an indexeddb by name
   * @param name
   */
  exports.deleteDatabase = function(name, callback)
  {
    try
    {
      var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

      var dbreq = indexedDB.deleteDatabase(name);
      dbreq.onsuccess = function()
      {
        console.log('indexedDB: ' + name + ' deleted');
        if(callback) callback()
      }
      dbreq.onerror = function(event)
      {
        console.error('indexedDB.delete Error: ' + event.message);
      }
    }
    catch(e)
    {
      console.error('Error: ' + e.message);
    }
  }

  return exports
})