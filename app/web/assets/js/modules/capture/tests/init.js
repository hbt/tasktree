// TODO(hbt) move to its own module
define(['keyboardSimulator'], function(Keyboard)
{
  describe('capture | saves new tasks', function()
  {

    describe('focus', function()
    {
      xit('pressing Alt-C should focus on input', function()
      {
      })

      xit('URL /#capture should focus on input', function()
      {

      })
    });

    describe('capturing', function()
    {

      it('type in input', function()
      {
        var input = $('#capture-container').find('input')
        input.focus()
        Keyboard.simulateTyping('new task yep\r\n', 'keydown')
      })

      xit('on Enter task is saved & syncs', function()
      {
      })

      xit('input is cleared', function()
      {
      })

      xit('task is tagged as #unprocessed', function()
      {

      })


      xit('task is added to the top of the list | to edit in case user presses Enter by mistake', function()
      {

      })

      xit('task fades away after 20 seconds', function()
      {

      })
    });

    describe('is the newly captured task in the list in edit mode?', function()
    {
      describe('yes', function()
      {
        xit('should disable fade away timer while focus is on | allow user to edit', function()
        {

        })

        describe('is focus removed?', function()
        {
          describe('yes', function()
          {
            xit('should restore fade away timer', function()
            {

            })
          });
        });

      });
    });
  })
});
