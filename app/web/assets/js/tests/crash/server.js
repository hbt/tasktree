// TODO(hbt) Refactor (low): include in tests + run
describe('Crash tests | server ', function()
{
  describe('when server crashes', function()
  {
    it('forever should restart it', function()
    {
      $.ajax({
        url:     App.config.serverURL + '/tests/purpose_crash',
        context: document.body,
        success: function(data)
        {
          assert.ok(data === 'down')
          var interval

          function checkServerIsUp()
          {
            $.ajax({
              url:     App.config.serverURL,
              context: document.body,
              success: function(data)
              {
                assert.ok(data === 'up')
                window.clearInterval(interval)

                done()
              }
            });
          }

          interval = window.setInterval(checkServerIsUp, 200)
        }
      });
    })
  });
});