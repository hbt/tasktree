define([], function()
{
  var DebugUtils = {
   init: function()
   {
     require(['utils/debug/reload'], function(Reloader)
     {
       Reloader.init()
     })
   }
  }

  return DebugUtils
})