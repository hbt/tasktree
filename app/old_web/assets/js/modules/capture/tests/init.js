// TODO(hbt) move to its own module
define(['keyboardSimulator'], function(Keyboard)
{
  describe('capture workflow | saves new tasks', function()
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

    describe('capture', function()
    {
      var input
      var value = 'new task from capture'

      // TODO(hbt) change to before
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


      xit('task is tagged as #unprocessed', function()
      {

      })

      describe('exceptions', function()
      {
        xit('should not save empty content', function()
        {

        })
      });
    })

    describe('clear', function()
    {
      xit('input is cleared', function()
      {
        assert.is(input.val(), '')
      })
    });

    describe('display newly captured at the top of the list', function()
    {
      describe('does the list have no filters active?', function()
      {
        xit('task is added to the top of the list | to edit in case user presses Enter by mistake', function()
        {
          var nvalue = 'second from capture'
          input.focus()
          Keyboard.simulateTyping(nvalue + '\r\n', 'keydown')

          var first = $('#list-container .task-input')[0]
          assert.is(window.App.collections.Tasks.at(0).get('content'), nvalue)
          assert.is(first.value, nvalue)
        })
      });
    });
  })
})
;
