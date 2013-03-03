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
        describe('on destroy', function()
        {

        });
        describe('one to many', function()
        {
          xit('asdw', function()
          {

          })
        });

        describe('many to many', function()
        {
          describe('adding', function()
          {

          });
        });
      });
    });
  })
