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
                assert.is(1, 1)
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
            var taggedContent, content
            beforeEach(function()
            {
              taggedContent = 'new task ' + coll.global.length + ' #tag1 #tag2 #tag1 #invalid+tag'
              content = 'new task ' + coll.global.length + '  #invalid+tag'
              Keyboard.simulateTyping(taggedContent, 'keyup')
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

            describe('has inline tags', function()
            {
              it('should create + associate tags to task', function()
              {
                var task = coll.global.at(0)

                assert.is(task.get('tags').length, 2)
                assert.is(task.get('tags').at(0).get('content'), 'tag1')
                assert.is(task.get('tags').at(1).get('content'), 'tag2')
              })
            });

            afterEach(function()
            {
              TestUtils.reset()
            })
          });
        });
      });
    });
  })
})
