define(['keyboardSimulator', 'utils/tests/helpers'], function(Keyboard, TestUtils)
{
  describe('List | One task', function()
  {
    describe('On enter', function()
    {
      it('should save', function()
      {
        // create task & check
        var content = 'editable task';
        var task = App.collections.Tasks.global.create({content: content})
        var input = $('#list-container input')[0]
        input.focus()
        assert.is(input.value, content)

        // change content
        var str = ' changed'
        var newContent = content + str
        Keyboard.simulateTyping(str, 'keyup')

        // save & check
        input.form.submit()
        assert.is(newContent, task.get('content'))
      })

      afterEach(function()
      {
        TestUtils.reset()
      })
    });
  });
})