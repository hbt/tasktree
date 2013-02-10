define(['config/config'], function(config)
{
  var ReloadModule = {

    lastVersion: -1,

    reloadIfNewVersion: function()
    {
      $.ajax({
        url:     config.debugVersionURL + '/debug-version.txt?bustCache=' + (+new Date()),
        context: document.body,
        success: function(data)
        {
          if(ReloadModule.lastVersion !== -1 && data > ReloadModule.lastVersion)
          {
            window.location.reload(true)
          }

          ReloadModule.lastVersion = data
        }
      });
    },

    init: function()
    {
      window.setInterval(ReloadModule.reloadIfNewVersion, 200)
    }
  }


  return ReloadModule
})
