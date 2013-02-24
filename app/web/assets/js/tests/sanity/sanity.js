// TODO(hbt) Refactor (low): separate this file into its own directory i.e sanity
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
