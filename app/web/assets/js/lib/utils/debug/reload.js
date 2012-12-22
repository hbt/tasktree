define([], function()
{
  var ReloadModule = {

    lastVersion: -1,

    reloadIfNewVersion: function()
    {
      $.ajax({
        url:     'http://localhost:9093/debug-version.txt',
        context: document.body,
        success: function(data)
        {
          if(ReloadModule.lastVersion !== -1 && data > ReloadModule.lastVersion)
          {
            window.location.reload()
          }

          ReloadModule.lastVersion = data
        }
      });
    },

    init: function()
    {
      // TODO(hbt) fix url
      window.setInterval(ReloadModule.reloadIfNewVersion, 500)
    }
  }

  return ReloadModule
})
