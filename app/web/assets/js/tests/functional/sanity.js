// TODO(hbt) separate this file into its own directory i.e sanity
// TODO(hbt) Refactor (low):
define([], function()
{
  describe('Sanity checks', function()
  {
    describe('Server', function()
    {
      it('server is running | to access remote database', function(done)
      {
        $.ajax({
          url:     App.config.serverURL,
          context: document.body,
          success: function(data)
          {
            assert.ok(data === 'up')
            done()
          }
        });
      })

      // TODO(hbt) separate crash tests into their own file
      if(!App.config.skipCrashTests)
      {

        it('forever restarts server | to recover from crashes', function(done)
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

      }
    })

    xit('remote database is running | to sync local data to remote database', function()
    {
    })

    xit('browser supports web sockets | app requires instant two-way communication between local & remote', function()
    {
    })

    xit('can read/write to local storage | data is stored locally for offline usage', function()
    {
    })
  })
});
