define([], function()
{
  describe('tag | tag management', function()
  {

    describe('Sidebar', function()
    {
      describe('List', function()
      {
        xit('should list existing tags', function()
        {

        })
      });

      describe('Tagging/Filtering', function()
      {
        describe('is a task selected?', function()
        {
          describe('yes | Tagging mode', function()
          {
            xit('should display the tags associated to the current task', function()
            {
            })

            xit('toggling a tag would tag the selected task', function()
            {

            })
          });

          describe('no | Filtering mode', function()
          {
            xit('should display the current filter', function()
            {

            })

            xit('toggling a tag would filter the results in the list further', function()
            {

            })
          });
        });
      });
    });

    // TODO(hbt) move into its own file
//    describe('Listing tags in the filter/tag sidebar', function()
//    {
//      describe('when tag is added', function()
//      {
//        describe('is new?', function()
//        {
//          describe('yes', function()
//          {
//
//            it('should appear in the list', function()
//            {
//              var tag = 'something-in-list'
//
//              window.App.collections.Tasks.create({content: 'new #' + tag})
//              var html = $('#tags-container').html()
//              assert.isnt(html.indexOf(tag), -1)
//            })
//          });
//
//          describe('no', function()
//          {
//
//            xit('count of tasks should be updated', function()
//            {
//              var duptag = 'something-in-list'
//              window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
//              window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
//              window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
//
//              // TODO(hbt) once UI is finalized
//              // extract number in () and add assert
//            })
//          });
//        });
//      });
//    });

    describe('Tagging workflow', function()
    {
      describe('Tagging with the sidebar', function()
      {
        describe('when a task is selected (focus on) and user clicks tags in the sidebar', function()
        {
          xit('should add tags to selected task', function()
          {

          })
        });
      });

      describe('inline tagging | user can tag data using # in text input', function()
      {
        describe('capture content with tags starting by #', function()
        {
          xit('task is tagged', function()
          {

            var task = window.App.collections.Tasks.create({content: '#new new task with #tag tagged as #errands #test'})
            assert.is(_.contains(task.getTags().pluck('content'), 'new', 'tag', 'errands', 'test'), true)

            var duptag = 'something-in-list'
            window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
            window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
            window.App.collections.Tasks.create({content: 'duplicate #' + duptag})
          })
        })
      });


      describe('sidebar tagging workflow', function()
      {

      });
    });
  });
})