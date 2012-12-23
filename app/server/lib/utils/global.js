(function()
{
  function initUtils()
  {
    c = console
    c.l = console.log
  }

// Note(hbt) used by the frontend
  if(typeof exports === 'undefined')
  {
    initUtils()
  }
  else
  {
    exports = initUtils()
  }
})()
