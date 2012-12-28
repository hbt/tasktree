define(['keyboardSimulator'], function(Keyboard)
{
  describe('Capture | saves new tasks', function()
  {

    xit('Alt-C focuses on capture input', function()
    {

    })
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

    describe('does it have tags?', function()
    {
      describe('no', function()
      {
        xit('should be tagged as unprocessed', function()
        {
        })

        xit('message should appear that the task was tagged as unprocessed', function()
        {

        })
      });

      describe('yes', function()
      {
        xit('message should appear that the task was tagged as #[tag-name]', function()
        {

        })
      });
    });

    describe('is a filter on?', function()
    {
      describe('yes', function()
      {
        xit('should not have the current filter as tags | enter tasks without having to change/clear filters', function()
        {
        })

        xit('should appear under the capture input', function()
        {
        })

        xit('should limit the number of new tasks under capture to the last three', function()
        {
        })

        xit('should fade after 10secs', function()
        {

        })
      })

      describe('no', function()
      {
        xit('append to the top of the list, limit to 5', function()
        {
        })

        xit('should fade after 20secs', function()
        {

        })
      });
    });
  })
});