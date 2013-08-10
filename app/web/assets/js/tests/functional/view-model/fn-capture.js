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
              _.events.once('on-msg-show', function()
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

                  it('should create + associate inline tags to task', function()
                  {
                    var task = coll.at(0)
                    var tags = task.getUserTags()

                    assert.is(tags.length, 2)
                    assert.is(tags.at(0).get('content'), 'tag1')
                    assert.is(tags.at(1).get('content'), 'tag2')
                  })
                });

                describe('no', function()
                {
                  xit('should be tagged as notags', function()
                  {

                  })
                });
              });


              it('should be tagged as #incomplete', function()
              {
                assert.is(coll.at(0).hasTag('incomplete'), true)
              })

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
                    assert.is(val, 'new task 0')
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
