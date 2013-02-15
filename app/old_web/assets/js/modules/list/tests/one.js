define([], function()
{
  describe('One | when one entry is selected', function()
  {
    describe('edit', function()
    {
      describe('when making a change and removing the focus', function()
      {
        xit('should save', function()
        {
          // TODO(hbt) fix this
          // Note(hbt) had problems with onEnter
          // capture
          var str = 'new task'
          var model = window.App.collections.Tasks.create({content: str}, {at: 0})

          // focus on first one
          var first = $('#list-container .task-input').first()
          first.focus()

          // make change
          var newstr = str + ' changed'
          first.val(newstr)

          // remove focus
          assert.is(model.get('content'), str)
          first.blur()

          // change should be saved on blur
          assert.is(model.get('content'), newstr)
        })
      });
    });

    describe('adding new entries', function()
    {
      describe('new task', function()
      {
        describe('when pressing Enter', function()
        {
          xit('should create new task under it', function()
          {
            // TODO(hbt) fix this
            // focus on newly created
            var first = $('#list-container .task-input').first()
            first.focus()

            // press Enter
            var tasks = window.App.collections.Tasks
            // TODO(hbt) replace \r\n by \r -- check other tests
            Keyboard.simulateTyping(first.val() + '\r', 'keydown')

            // verify new input is created under + has focus
            var newinput = $('#list-container .task-input')[1]
            assert.is(tasks.at(1).get('content'), '')
            assert.is(newinput.value, '')
            assert.is(document.activeElement, newinput)


            // no new empty entries are created if there is already one
            first.focus()
            var length = tasks.length
            Keyboard.simulateTyping('\r', 'keydown')
            assert.is(tasks.length, length)
          })
        });

        describe('exceptions', function()
        {
          describe('is the entry below empty?', function()
          {
            xit('should select it instead of creating a new one', function()
            {

            })
          });
        });
      });

      describe('new child', function()
      {
        describe('when pressing shift+Enter', function()
        {
          xit('should create new child', function()
          {

          })

          describe('exceptions', function()
          {
            describe('is the entry below empty?', function()
            {
              xit('should select it instead of creating a new one', function()
              {

              })
            });
          });
        });
      });
    });


    describe('buttons', function()
    {
      describe('done/undone', function()
      {
        describe('when clicking the checkbox', function()
        {
          xit('should toggle between done/undone', function()
          {

          })
        });
      });


      describe('tags', function()
      {
        xit('should list all tags associated to this task', function()
        {

        })

        describe('when clicking a tag', function()
        {
          xit('should untag it', function()
          {

          })
        });
      });

      describe('tree', function()
      {
        describe('left arrow | make a parent', function()
        {
          xit('should only appear if task is a child and can be made a parent', function()
          {
          })

          describe('when clicked', function()
          {
            xit('should make task a brother of its parent', function()
            {

            })
          });
        });

        describe('right arrow | make a child', function()
        {
          xit('should only appear if task can be made into a child', function()
          {
          })

          describe('when clicked', function()
          {
            xit('should make task a child of the previous task', function()
            {

            })
          });
        });
      });

      describe('delete', function()
      {
        xit('should display a confirmation', function()
        {

        })

        xit('should delete if confirmed', function()
        {

        })
      });


      describe('subsort', function()
      {
        describe('move Up', function()
        {
          xit('should move the task up the list', function()
          {

          })
        });

        describe('move Down', function()
        {
          xit('should move the task down the list', function()
          {

          })
        });
      });
    });
  });
})