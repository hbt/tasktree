define(['libs/jquery-plugins/send-keys/send-keys'], function()
{
  var simulator = {

    simulateTyping: function(string, eventType, loop)
    {
      eventType = eventType || 'keypress'

      if(!!loop)
      {
        _.each(string.split(''), function(v)
        {

          $(document.activeElement).sendkeys(v, {
            type: eventType
          });
        })
      }
      else
      {
        $(document.activeElement).sendkeys(string, {
          type: eventType
        });
      }
    }
  }

  window.sim = simulator

  return simulator
})
