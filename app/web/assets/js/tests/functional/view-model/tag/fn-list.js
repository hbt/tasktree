define(['models/tag', 'utils/tests/helpers'], function(Tag, TestUtils)
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
        html = $('#tags-container').html()
        assert.isnt(html.indexOf('tag1'), -1)
      })
    });

    afterEach(function()
    {
      TestUtils.reset()
    })
  });
})