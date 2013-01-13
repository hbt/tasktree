define(['keyboardSimulator'], function(Keyboard)
{
  describe('list | one task', function()
  {

    // TODO(hbt) NEXT implement
    describe('in edit mode', function()
    {
      // TODO(hbt) review tests where variables are defined out of scope + figure out how mocha interprets them

      it('should save on blur', function()
      {
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

      xit('should save after 60 secs if focus is still on and no other key was pressed | in case a change is made and user leaves', function()
      {

      })

      describe('when pressing Enter', function()
      {
        describe('is there an empty entry under current?', function()
        {
          describe('yes', function()
          {
            xit('should not create a new one', function()
            {

            })

            xit('should focus on existing one', function()
            {

            })
          });


          describe('no', function()
          {
            xit('create a new entry and focus', function()
            {
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

            xit('should focus on new entry', function()
            {

            })
          });

        })
        it('should create new one under current and focus unless there is already an empty entry', function()
        {
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

    });

    describe('tree', function()
    {
      xit('should create child when pressing shift+Enter', function()
      {
        // TODO(hbt) NEXT 8

        // capture new

        // shift+enter

        // verify child is created

        // verify child has newly captured as parent

        // verify child appears in list

        // modify child text

        // verify child saves

      })

      xit('should move task as child when pressing -> button', function()
      {

      })

      xit('should move task as a parent when pressing <- button', function()
      {

      })
    });

  });
});