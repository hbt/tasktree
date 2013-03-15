define(['models/tag', 'models/task', 'utils/tests/helpers'], function(Tag, Task, TestUtils)
{
  describe('List tags', function()
  {
    beforeEach(function()
    {
      TestUtils.reset()
    })
    describe('when adding a tag', function()
    {
      it('should appear in the list', function()
      {
        // list is clean
        var html = $('#tags-container').html()
        assert.is(html.indexOf('tag1'), -1)

        Tag.prototype.global.create({content: 'tag1'})

        // list has it
        html = $('#tags-container div span').html()
        assert.isnt(html.indexOf('tag1'), -1)

        // auto-updates when adding a task
        Task.prototype.global.create({content: 'some #tag1'})
        html = $('#tags-container div span:nth-child(1)').html()
        assert.isnt(html.indexOf('1'), -1)
      })
    });

    afterEach(function()
    {
      TestUtils.reset()
    })
  });
})