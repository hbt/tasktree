define([], function()
{
  describe('Sanity checks', function()
  {
    describe('Server', function()
    {
      it('server is running | to access remote database', function(done)
      {
        // TODO(hbt) fix url
        $.ajax({
          url:     'http://localhost:3000',
          context: document.body,
          success: function()
          {
            done()
          }
        });
      })

      it('forever restarts server | to recover from crashes', function(done)
      {

        // TODO(hbt) fix url
        $.ajax({
          url:     'http://localhost:3000/tests/purpose_crash',
          context: document.body,
          success: function()
          {
            var interval

            function checkServerIsUp()
            {
              // TODO(hbt) fix url
              $.ajax({
                url:     'http://localhost:3000',
                context: document.body,
                success: function()
                {
                  done()
                  window.clearInterval(interval)
                }
              });
            }

            interval = window.setInterval(checkServerIsUp, 200)
          }
        });
      })
    })

    xit('remote database is running | to sync local data to remote database', function()
    {
    })

    xit('browser supports web sockets | app requires instant two-way communication between local & remote', function()
    {
    })
  })
});
