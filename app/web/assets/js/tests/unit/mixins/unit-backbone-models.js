define(['mixins/backbone-models', 'utils/tests/helpers', 'models/tag', 'models/task'],
  function(Mixins, TestUtils, Tag, Task)
  {
    describe('Mixins backbone models', function()
    {
      describe('relations', function()
      {
        describe('setup', function()
        {
          describe('defaults', function()
          {
            it('should create defaults in related models', function()
            {
              var tag = new Tag()
              var task = new Task()


              // many to many
              assert.is(_.isArray(tag.get('tasks')), true)
              assert.is(_.isArray(task.get('tags')), true)


              // one to many
              assert.is(_.isArray(task.get('children')), true)
              assert.is(task.get('parent'), null)
            })
          });
        });

        describe('set', function()
        {
          before(function()
          {
            TestUtils.reset()
          })

          describe('can parse values in multiple formats', function()
          {
            var task, tag
            beforeEach(function()
            {
              TestUtils.reset()
              task = App.collections.Tasks.global.create({content: 'new'})
              tag = App.collections.Tags.global.create({content: 'tag1'})
            })
            describe('using unique field', function()
            {

            });

            describe('json', function()
            {

            });

            it('model', function()
            {
              task.save({tags: [tag]})

              assert.is(task.get('tags')[0], tag.get('id'))
              assert.is(task.get('tags').length, 1)

              assert.is(tag.get('tasks')[0], task.get('id'))
              assert.is(tag.get('tasks').length, 1)
            });

            describe('collection', function()
            {

            });
          });
        });
      });
    });
  })
