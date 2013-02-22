define(['keyboardSimulator', 'utils/tests/helpers'], function(Keyboard, TestUtils)
{

  describe('Capture | saves new tasks', function()
  {

    describe('focus', function()
    {
      describe('on Alt-C', function()
      {
        xit('should focus on input', function()
        {

        })
      });
    });

    describe('capture', function()
    {
      describe('on Enter', function()
      {
        var input, coll
        beforeEach(function()
        {
          input = $('#capture-container input')
          input.focus()
          coll = App.collections.Tasks
        })

        describe('is invalid? | empty', function()
        {
          describe('yes', function()
          {
            beforeEach(function()
            {
              Keyboard.simulateTyping(' ', 'keyup')
            })

            it('should display error message', function(done)
            {
              _.events.on('on-msg-show', function()
              {
                done()
              })
              input.closest('form').submit()
            })

            it('should not save', function()
            {
              assert.is(coll.global.length, 0)
            })

            afterEach(function()
            {
              input.val('')
              TestUtils.reset()
            })
          });

          describe('no', function()
          {
            var content
            beforeEach(function()
            {
              content = 'new task ' + coll.global.length
              Keyboard.simulateTyping(content, 'keyup')
              input.closest('form').submit()
            })

            it('should save', function()
            {
              assert.is(coll.global.length, 1)
            })

            it('should clear input', function()
            {
              assert.is(input.val(), '')
            })

            it('should display at the top of the list', function()
            {
              var val = $('#list-container input').first().val()
              assert.is(val, content)
            })

            afterEach(function()
            {
              TestUtils.reset()
            })
          });
        });
      });

//      it('type in input', function()
//      {
//        var input = $('#capture-container').find('input')
//        input.focus()
//        Keyboard.simulateTyping('new task yep\r\n', 'keydown')
//      })


    });

//    describe('does it have tags?', function()
//    {
//      describe('no', function()
//      {
//        xit('should be tagged as unprocessed', function()
//        {
//        })
//
//        xit('message should appear that the task was tagged as unprocessed', function()
//        {
//
//        })
//      });
//
//      describe('yes', function()
//      {
//        xit('message should appear that the task was tagged as #[tag-name]', function()
//        {
//
//        })
//      });
//    });
//
//    describe('is a filter on?', function()
//    {
//      describe('yes', function()
//      {
//        xit('should not have the current filter as tags | enter tasks without having to change/clear filters', function()
//        {
//        })
//
//        xit('should appear under the capture input', function()
//        {
//        })
//
//        xit('should limit the number of new tasks under capture to the last three', function()
//        {
//        })
//
//        xit('should fade after 10secs', function()
//        {
//
//        })
//      })
//
//      describe('no', function()
//      {
//        xit('append to the top of the list, limit to 5', function()
//        {
//        })
//
//        xit('should fade after 20secs', function()
//        {
//
//        })
//      });
//    });
  })
})
