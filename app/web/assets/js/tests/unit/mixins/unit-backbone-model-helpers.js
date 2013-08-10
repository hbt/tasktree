define(['utils/tests/helpers'], function(TestUtils)
{
  describe('Backbone model helpers | unit', function()
  {

    describe('check relations + saving', function()
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

            parent.save()
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

            parent.save()
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
              assert.is(task.getUserTags().length, 2)

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
              assert.is(tag1.getTasks()[0], task.get('id'))


              assert.is(tag2.getTasks().length, 1)
              assert.is(tag2.getTasks()[0], task.get('id'))

              done()
            })

            task.save()
          })

          it('should track unique keys | not duplicates', function(done)
          {
            task.once('sync', function()
            {
              assert.is(task.getUserTags().length, 2)

              task.tag('tag1')

              // remains the same after
              assert.is(task.getUserTags().length, 2)

              done()
            })

            task.save()
          })
        });

        describe('storage', function()
        {
          it('should save model + its relations', function(done)
          {

            // necessary because we need all elements to be saved in storage before wiping everything out from memory
            // all 5 syncs must be triggered
            var after = _.after(5, function()
            {
              assert.is(task.getUserTags().length, 2)

              // check this was actually stored
              var taskId = task.get('id')

              // clear it from memory
              TestUtils.resetCollections()
              task = Backbone.Relational.store.find(App.models.Task, taskId)
              assert.is(task, null)

              // fetch from storage
              App.collections.Tags.fetch().then(function()
              {
                // verify first because we want to make sure it is not influenced after tasks are loaded
                assert.is(App.utils.findTag('tag1').getTasks()[0], taskId)
                assert.is(App.utils.findTag('tag2').getTasks()[0], taskId)


                App.collections.Tasks.fetch().then(function()
                {
                  task = Backbone.Relational.store.find(App.models.Task, taskId)

                  // is stored properly both ways
                  assert.is(task.getUserTags().length, 2)

                  done()
                })
              })
            })


            task.once('sync', after)

            task.save()

            App.utils.findTag('tag1').on('sync', after)
            App.utils.findTag('tag2').on('sync', after)
          })
        });

      });

      afterEach(function(done)
      {
        TestUtils.reset(done)
      })

    });


    // deprecated -- mainly because backbone-relational fires too many events and
    // difficult to sort out what is being updated due to a change vs all the other noise
    // abstracted the single save as much as possible in the API
    describe('single save | save related models', function()
    {
//
//      describe('one to many', function()
//      {
//
//        var parent, child, Task
//        beforeEach(function()
//        {
//          Task = App.models.Task
//          parent = new Task({content: 'parent'})
//          child = new Task({content: 'child'})
//          child.set('parent', parent)
//        })
//
//        describe('relations', function()
//        {
//          it('should track relation in model (parent)', function(done)
//          {
//            // tracks relation
//            assert.is(child.get('parent').get('id'), parent.get('id'))
//            child.once('sync', function()
//            {
//              done()
//            })
//
//            child.save()
//          })
//
//          it('should track relation in related model (children)', function(done)
//          {
//            assert.is(parent.get('children').at(0).get('id'), child.get('id'))
//            parent.once('sync', function()
//            {
//              done()
//            })
//
//            child.save()
//          })
//        });
//
//        describe('storage', function()
//        {
//
//          it('should save model + its relations', function(done)
//          {
//            child.once('sync', function()
//            {
//              // check this was actually stored
//              var childId = child.get('id')
//              var parentId = parent.get('id')
//
//              // clear it from memory
//              TestUtils.resetCollections()
//              child = Backbone.Relational.store.find(App.models.Task, childId)
//              assert.is(child, null)
//
//              // fetch from storage
//              App.collections.Tags.fetch().then(function()
//              {
//                App.collections.Tasks.fetch().then(function()
//                {
//                  child = Backbone.Relational.store.find(App.models.Task, childId)
//                  parent = Backbone.Relational.store.find(App.models.Task, parentId)
//
//                  // is stored properly both ways
//                  assert.is(child.get('parent').get('id'), parent.get('id'))
//                  assert.is(parent.get('children').at(0).get('id'), child.get('id'))
//
//                  done()
//                })
//              })
//            })
//
//            child.save()
//          })
//        });
//
//      });
//
//      describe('many to many', function()
//      {
//
//        var task
//        beforeEach(function()
//        {
//          var Task = App.models.Task
//          task = new Task({content: 'task #tag1 #tag2'})
//        })
//
//        describe('relations', function()
//        {
//
//          it('should track tags', function(done)
//          {
//            task.once('sync', function()
//            {
//              assert.is(task.getUserTags().length, 2)
//
//              assert.is(task.getTags().at(0).get('content'), 'tag1')
//              assert.is(task.getTags().at(1).get('content'), 'tag2')
//
//              assert.is(task.get('taskstags').at(0).get('tag').get('content'), 'tag1')
//              assert.is(task.get('taskstags').at(1).get('tag').get('content'), 'tag2')
//
//              done()
//            })
//
//            task.save()
//          })
//
//
//          it('should track tasks', function(done)
//          {
//            task.once('sync', function()
//            {
//              var tag1 = task.getTags().at(0)
//              var tag2 = task.getTags().at(1)
//
//              // Note(hbt) there is a bug in backbone relational where it saves null in addition to saving the task (i.e two records)
//              // rendering the taskstags useless without a wrapper
//              assert.is(tag1.getTasks().length, 1)
//              assert.is(tag1.getTasks()[0], task.get('id'))
//
//
//              assert.is(tag2.getTasks().length, 1)
//              assert.is(tag2.getTasks()[0], task.get('id'))
//
//              done()
//            })
//
//            task.save()
//          })
//
//          it('should track unique keys | not duplicates', function(done)
//          {
//            task.once('sync', function()
//            {
//              assert.is(task.getUserTags().length, 2)
//
//              task.tag('tag1')
//
//              // remains the same after
//              assert.is(task.getUserTags().length, 2)
//
//              done()
//            })
//
//            task.save()
//          })
//        });
//
//        describe('storage', function()
//        {
//          it('should save model + its relations', function(done)
//          {
//
//            // necessary because we need all elements to be saved in storage before wiping everything out from memory
//            // all 3 syncs must be triggered
//            var after = _.after(3, function()
//            {
//              assert.is(task.getUserTags().length, 2)
//
//              // check this was actually stored
//              var taskId = task.get('id')
//
//              // clear it from memory
//              TestUtils.resetCollections()
//              task = Backbone.Relational.store.find(App.models.Task, taskId)
//              assert.is(task, null)
//
//              // fetch from storage
//              App.collections.Tags.fetch().then(function()
//              {
//                // verify first because we want to make sure it is not influenced after tasks are loaded
//                assert.is(App.utils.findTag('tag1').getTasks()[0], taskId)
//                assert.is(App.utils.findTag('tag2').getTasks()[0], taskId)
//
//
//                App.collections.Tasks.fetch().then(function()
//                {
//                  task = Backbone.Relational.store.find(App.models.Task, taskId)
//
//                  // is stored properly both ways
//                  assert.is(task.getUserTags().length, 2)
//
//                  done()
//                })
//              })
//            })
//
//
//            task.once('sync', after)
//
//            task.save()
//
//            task.getTags().at(0).once('sync', after)
//            task.getTags().at(1).once('sync', after)
//          })
//        });
//
//      });
//
//      afterEach(function(done)
//      {
//        TestUtils.reset(done)
//      })

    });
  });
})

