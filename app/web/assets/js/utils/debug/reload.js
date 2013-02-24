// TODO(hbt) Refactor (high): abstract and improve + remove dependency on jquery

// TODO(hbt) Feature: only run when in dev mode

(function(window)
{
  var ReloadModule = {

    lastVersion: -1,

    reloadIfNewVersion: function()
    {
      if(typeof $ === 'undefined')
      {
        return;
      }
      $.ajax({
        url:     './debug-version.txt?bustCache=' + (+new Date()),
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
      window.setInterval(ReloadModule.reloadIfNewVersion, 300)
    }
  }

  ReloadModule.init()
}(this));