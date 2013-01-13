define([], function()
{
  describe('tag | tag management', function()
  {
    // TODO(hbt) move into its own file
    describe('Listing tags in the filter/tag sidebar', function()
    {
      describe('when tag is added', function()
      {
        describe('is new?', function()
        {
          describe('yes', function()
          {

            it('should appear in the list', function()
            {
              var tag = 'something-in-list'

              window.App.collections.Tasks.create({content: 'new #' + tag})
              var html = $('#tags-container').html()
              assert.isnt(html.indexOf(tag), -1)
            })
          });

          describe('no', function()
          {

            xit('count of tasks should be updated', function()
            {
              var duptag = 'something-in-list'
              window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
              window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
              window.App.collections.Tasks.create({content: 'duplicate #' + duptag})

              // TODO(hbt) once UI is finalized
              // extract number in () and add assert
            })
          });
        });
      });
    });

    describe('Tagging', function()
    {
//      // TODO(hbt) skipping the tests on this for now until I clear the structure in my head as to have indices for tags or not
//      describe('general', function()
//      {
//        xit('tags have __module__ tag as their metadata', function()
//        {
//        })
//
//        xit('tag content starts with #', function()
//        {
//
//        })
//      });
//      describe('using the UI', function()
//      {
//
//      });

//        describe('when adding a tag using the UI', function()
//        {
//          xit('should only accept alphanumerical characters with - and _ as separators | keeps parsing simple', function()
//          {
//
//          })
//
//          xit('should have __module__ tag as its metadata and be listed as a child | all tags are tracked', function()
//          {
//
//          })
//
//
//          xit('should have the tagged content as a child and the child have the data as its metadata', function()
//          {
//
//          })
//        });
//
//        describe('when removing a tag', function()
//        {
//          xit('data no longer has the tag as its metadata and tag no longer has data as its child', function()
//          {
//
//          })
//        });

      describe('using text input | inline tagging: user can tag data using # in text input', function()
      {
        it('tags are extracted from content', function()
        {
          var task = window.App.collections.Tasks.create({content: '#new new task with #tag tagged as #errands #test'})
          assert.is(_.contains(task.getTags().pluck('content'), 'new', 'tag', 'errands', 'test'), true)

          var duptag = 'something-in-list'
          window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
          window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
          window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
        })

        xit('content does not include tags inline after save', function()
        {
          var task = window.App.collections.Tasks.last()
          assert.is(task.get('content'), 'new task with tagged as')
        })
      });

    });
  });
})