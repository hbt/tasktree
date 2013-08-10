define(['utils/tests/helpers'], function(TestUtils)
{
  describe('Backbone model helpers | unit', function()
  {
    describe('single save | save related models', function()
    {

      describe('one to many', function()
      {

        var parent, child, Task
        beforeEach(function()
        {
          Task = App.models.Task
          parent = new Task({content: 'parent'})
          child = new Task({content: 'child'})
          child.set('parent', parent)
        })

        describe('relations', function()
        {
          it('should track relation in model (parent)', function(done)
          {
            // tracks relation
            assert.is(child.get('parent').get('id'), parent.get('id'))
            child.once('sync', function()
            {
              done()
            })

            child.save()
          })

          it('should track relation in related model (children)', function(done)
          {
            assert.is(parent.get('children').at(0).get('id'), child.get('id'))
            parent.once('sync', function()
            {
              done()
            })

            child.save()
          })
        });

        describe('storage', function()
        {

          it('should save model + its relation', function(done)
          {
            child.once('sync', function()
            {
              // check this was actually stored
              var childId = child.get('id')
              var parentId = parent.get('id')

              // clear it from memory
              TestUtils.resetCollections()
              child = Backbone.Relational.store.find(App.models.Task, childId)
              assert.is(child, null)

              // fetch from storage
              App.collections.Tags.fetch().then(function()
              {
                App.collections.Tasks.fetch().then(function()
                {
                  child = Backbone.Relational.store.find(App.models.Task, childId)
                  parent = Backbone.Relational.store.find(App.models.Task, parentId)

                  // is stored properly both ways
                  assert.is(child.get('parent').get('id'), parent.get('id'))
                  assert.is(parent.get('children').at(0).get('id'), child.get('id'))

                  done()
                })
              })
            })

            child.save()
          })
        });

      });

      describe('many to many', function()
      {

        var task
        beforeEach(function()
        {
          var Task = App.models.Task
          task = new Task({content: 'task #tag1 #tag2'})
        })


        xit('should save the model', function()
        {
          assert.is('')
          task.once('sync', function()
          {
            done()
          })

          task.save()
        })

        xit('should save related models', function()
        {

        })
      });

      afterEach(function(done)
      {
        TestUtils.reset(done)
      })

    });
  });
})

