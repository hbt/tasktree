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

          it('should save model + its relations', function(done)
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

        describe('relations', function()
        {

          it('should track tags', function(done)
          {
            task.once('sync', function()
            {
              assert.is(task.getTags().length, 2)

              assert.is(task.getTags().at(0).get('content'), 'tag1')
              assert.is(task.getTags().at(1).get('content'), 'tag2')

              assert.is(task.get('taskstags').at(0).get('tag').get('content'), 'tag1')
              assert.is(task.get('taskstags').at(1).get('tag').get('content'), 'tag2')

              done()
            })

            task.save()
          })


          it('should track tasks', function(done)
          {
            task.once('sync', function()
            {
              var tag1 = task.getTags().at(0)
              var tag2 = task.getTags().at(1)

              // Note(hbt) there is a bug in backbone relational where it saves null in addition to saving the task (i.e two records)
              // rendering the taskstags useless without a wrapper
              assert.is(tag1.getTasks().length, 1)
              assert.is(tag1.getTasks().at(0), task)


              assert.is(tag2.getTasks().length, 1)
              assert.is(tag2.getTasks().at(0), task)

              done()
            })

            task.save()
          })

          it('should track unique keys | not duplicates', function(done)
          {
            task.once('sync', function()
            {
              assert.is(task.getTags().length, 2)
              assert.is(task.get('taskstags').length, 2)

              task.tag('tag1')

              // remains the same after
              assert.is(task.getTags().length, 2)
              assert.is(task.get('taskstags').length, 2)

              done()
            })

            task.save()
          })
        });

        describe('storage', function()
        {
          it('should save model + its relations', function(done)
          {
            task.once('sync', function()
            {
              assert.is(task.getTags().length, 2)

              // check this was actually stored
              var taskId = task.get('id')

              // clear it from memory
              TestUtils.resetCollections()
              task = Backbone.Relational.store.find(App.models.Task, taskId)
              assert.is(task, null)

              // fetch from storage
              App.collections.Tags.fetch().then(function()
              {
                App.collections.Tasks.fetch().then(function()
                {
                  task = Backbone.Relational.store.find(App.models.Task, taskId)

                  // is stored properly both ways
                  assert.is(task.getTags().length, 2)

                  assert.is(task.getTags().at(0).getTasks().at(0), task)
                  assert.is(task.getTags().at(1).getTasks().at(0), task)


                  done()
                })
              })

            })

            task.save()
          })
        });

      });

      afterEach(function(done)
      {
        TestUtils.reset(done)
      })

    });
  });
})

