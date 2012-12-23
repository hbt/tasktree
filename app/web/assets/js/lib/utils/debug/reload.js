define([], function()
{
  var ReloadModule = {

    lastVersion: -1,

    reloadIfNewVersion: function()
    {
      $.ajax({
        url:     App.config.debugVersionURL + '/debug-version.txt?bustCache=' + (+new Date()),
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
      window.setInterval(ReloadModule.reloadIfNewVersion, 500)
    }
  }

  return ReloadModule
})
