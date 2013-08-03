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
      var input, coll

      describe('on Enter', function()
      {
        beforeEach(function()
        {
          input = $('#capture-container input')
          input.focus()
          coll = App.collections.Tasks
        })

        describe('is content invalid? | empty', function()
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
              assert.is(coll.length, 0)
            })

            afterEach(function()
            {
              input.val('')
            })
          });

          describe('no', function()
          {
            var content
            beforeEach(function()
            {
              content = 'new task ' + coll.length + ' #tag1 #tag2 #tag1 #invalid+tag'
              Keyboard.simulateTyping(content, 'keyup')
              input.closest('form').submit()
            })

            it('should save', function()
            {
              assert.is(coll.length, 1)
            })

            it('should clear input', function()
            {
              assert.is(input.val(), '')
            })

            describe('tagging', function()
            {

              describe('has inline tags?', function()
              {
                describe('yes', function()
                {

                  xit('should create + associate tags to task', function()
                  {
                    var task = coll.at(0)

                    var tag1 = task.get('tags').at(0)
                    var tag2 = task.get('tags').at(1)

                    assert.is(task.get('tags').length, 2)
                    assert.is(task.get('tags').at(0).get('content'), 'tag1')
                    assert.is(task.get('tags').at(1).get('content'), 'tag2')

                    assert.is(tag1.get('tasks').at(0), task)
                    assert.is(tag2.get('tasks').at(0), task)


                    // data is saved -- verify due to post-save
                    assert.is(task.getRawJSON().tags.length, 2)
                    assert.is(tag1.getRawJSON().tasks.length, 1)
                    assert.is(tag2.getRawJSON().tasks.length, 1)
                  })
                });

                describe('no', function()
                {
                  xit('should be tagged as notags', function()
                  {

                  })
                });
              });

              xit('should be tagged as #unprocessed', function()
              {
              })

              describe('is "tag using active filter" on?', function()
              {
                xit('should also be tagged according to active tags', function()
                {

                })
              });
            });


            describe('append to list', function()
            {
              describe('has filter?', function()
              {
                describe('yes', function()
                {
                  describe('tags match current filter?', function()
                  {
                    describe('yes', function()
                    {
                      xit('should appear at the top of the list', function()
                      {
                      })
                    });

                    describe('no', function()
                    {
                      xit('should not appear at the top of the list', function()
                      {

                      })
                    });
                  })
                });

                describe('no', function()
                {
                  it('should appear at the top of the list', function()
                  {
                    var val = $('#list-container input').first().val()
                    assert.is(val, content)
                  })

                });
              })
            });


            afterEach(function(done)
            {
              TestUtils.reset(done)
            })

          });
        });
      });
    });
  })
})
