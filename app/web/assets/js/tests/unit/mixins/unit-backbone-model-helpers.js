define(['utils/tests/helpers'], function(TestUtils)
{
  describe('Backbone model helpers | unit', function()
  {
    describe('single save | save related models', function()
    {
      var parent, child, Task
      beforeEach(function()
      {
        Task = App.models.Task
        parent = new Task({content: 'parent'})
        child = new Task({content: 'child'})
        child.set('parent', parent)
      })

      it('should save the model', function(done)
      {
        assert.is(child.get('parent').get('id'), parent.get('id'))
        child.once('sync', function()
        {
          done()
        })
        child.save()
      })

      it('on sync should save related models', function(done)
      {
        assert.is(parent.get('children').at(0).get('id'), child.get('id'))
        parent.once('sync', function()
        {
          done()
        })

        child.save()
      })

      afterEach(function(done)
      {
        TestUtils.reset(done)
      })

    });
  });
})

