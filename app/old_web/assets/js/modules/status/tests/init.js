define([], function()
{
  describe('status | done/undone/in-progress', function()
  {
    it('new tasks are tagged as undone', function()
    {
      var task = window.App.collections.Tasks.create({content: 'new undone task '})
      assert.is(_.include(task.getTags().pluck('content'), 'undone'), true)
    })

    // TODO(hbt) move this test to tags
    it('tags cannot have tags', function()
    {
      var tag = window.App.collections.Tags.createUnique({content: 'undone'})
      assert.is(_.every(tag.getChildren().pluck('id'), function(id)
      {
        return !!id
      }), true)
    })

    describe('does the task have focus?', function()
    {

      xit('should display checkbox to toggle done/undone status', function()
      {
        // TODO(hbt) add assert to check task is in edit mode + has focus
      })

      describe('is checkbox checked?', function()
      {
        it('should toggle done/undone metadata', function()
        {
          var task = window.App.collections.Tasks.create({content: 'toggle done/undone task'}, {at: 0})
          var chk = $('#task-' + task.get('id') + ' .status')

          chk.click()
          assert.is(task.isDone(), true)

          chk.click()
          assert.is(task.isUndone(), true)
        })


      });

    });

  });
})