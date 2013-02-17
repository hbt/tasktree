define(['services/msg'], function(Msg)
{
  describe('Messaging Services', function()
  {
    describe('show', function()
    {
      describe('message already in display?', function()
      {
        var msg
        beforeEach(function()
        {
          msg = 'test msg err'
          Msg.error(msg)
          assert.is(Msg.model.message(), msg)

        })
        describe('yes', function()
        {
          it('should clear the timeout', function()
          {
            var timeout = Msg.lastTimeout
            var str = 'new test msg err';
            Msg.error(str)
            assert.isnt(timeout, Msg.lastTimeout)
            assert.is(Msg.model.message(), str)
          })
        });

        it('should display a message', function()
        {
          assert.is($('#messages-container span')[0].innerHTML, Msg.model.message())
        })

        it('should clear after a certain duration', function(done)
        {
          var str = 'some message';
          Msg.show('error', str, 100)
          window.setTimeout(function()
          {
            assert.is(str, Msg.model.message())
            assert.is(true, Msg.model.show())
          }, 50)

          window.setTimeout(function()
          {
            assert.is(false, Msg.model.show())
            done()
          }, 150)
        })
      });
    });

    describe('error', function()
    {
      xit('should display an error message', function()
      {
        // TODO(hbt) implement with bootstrap + check html
      })
    });
  });
})
