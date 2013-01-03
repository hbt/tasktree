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
      var input
      var value = 'new task from capture'

      it('type in input', function()
      {
        input = $('#capture-container').find('input')
        input.focus()
        Keyboard.simulateTyping(value + '\r\n', 'keydown')
      })

      it('on Enter task is saved', function()
      {
        assert.is(window.App.collections.Tasks.at(0).get('content'), value)
      })

      it('input is cleared', function()
      {
        assert.is(input.val(), '')
      })


      xit('task is tagged as #unprocessed', function()
      {

      })


      it('task is added to the top of the list | to edit in case user presses Enter by mistake', function()
      {
        var nvalue = 'second from capture'
        input.focus()
        Keyboard.simulateTyping(nvalue + '\r\n', 'keydown')

        var first = $('#list-container .task-input')[0]
        assert.is(window.App.collections.Tasks.at(0).get('content'), nvalue)
        assert.is(first.value, nvalue)
      })

      xit('task fades away after 20 seconds', function()
      {

      })

      xit('should not save empty content', function()
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
