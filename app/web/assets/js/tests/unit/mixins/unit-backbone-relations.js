define(['utils/tests/helpers'], function(TestUtils)
{
  describe('Relations', function()
  {
    describe('one to many', function()
    {
      var parent, child

      before(function()
      {
        TestUtils.reset()
        parent = App.models.Task.prototype.global.create({content: 'new parent'})
        child = App.models.Task.prototype.global.create({content: 'child 1'})
      })

      // TODO(hbt) Refactor (low): split into smaller tests like the many to many -- too many assertions
      describe('when adding', function()
      {
        beforeEach(function()
        {
          // add child
          parent.get('children').add(child)
          parent.save()
        })

        it('should update the related model', function()
        {
          // verify relations are updated
          assert.is(parent.get('children').pluck('id')[0], child.get('id'))
          assert.is(child.get('parent').get('id'), parent.get('id'))

          // verify data is saved
          assert.is(parent.getRawJSON().children[0], child.get('id'))
          assert.is(child.getRawJSON().parent, parent.get('id'))
        })

        it('should use the same reference in related model', function()
        {
          // same reference
          assert.is(child.get('parent'), parent)
        })

        it('should not overwrite when adding another model', function()
        {
          // add another child
          var child2 = App.models.Task.prototype.global.create({content: 'child 2'})
          parent.get('children').add(child2)
          parent.save()

          // verify nothing is overwritten
          assert.is(parent.get('children').pluck('id')[1], child2.get('id'))
          assert.is(child2.get('parent').get('id'), parent.get('id'))
          assert.is(child.get('parent').get('id'), parent.get('id'))


          // verify data is saved
          assert.is(parent.getRawJSON().children[0], child.get('id'))
          assert.is(parent.getRawJSON().children[1], child2.get('id'))
          assert.is(child.getRawJSON().parent, parent.get('id'))
          assert.is(child2.getRawJSON().parent, parent.get('id'))

        })
      });

      describe('when removing', function()
      {
        it('should remove', function()
        {
          assert.is(parent.get('children').length, 2)
          var first = parent.get('children').first()
          assert.is(first.get('parent').get('id'), parent.get('id'))

          // delete
          parent.get('children').remove(first)
          parent.save()

          // verify
          assert.is(parent.get('children').length, 1)
          assert.is(first.get('parent'), null)


          // verify data is saved
          assert.isnt(parent.getRawJSON().children[0], child.get('id'))
          assert.is(child.getRawJSON().parent, null)

        })

      });
    });

    describe('many to many', function()
    {

      var task1, task2, tag1, tag2
      before(function()
      {
        TestUtils.reset()
        task1 = App.models.Task.prototype.global.create({content: 'task 1'})
        task2 = App.models.Task.prototype.global.create({content: 'task 2'})

        tag1 = App.models.Tag.prototype.global.create({content: 'tag 1'})
        tag2 = App.models.Tag.prototype.global.create({content: 'tag 2'})
      })

      describe('adding', function()
      {
        it('should add related', function()
        {
          task1.get('tags').add([tag1, tag2])
          task1.save()

          assert.is(task1.get('tags').length, 2)
          assert.is(tag1.get('tasks').length, 1)
          assert.is(tag2.get('tasks').length, 1)

          // verify data is saved
          assert.is(task1.getRawJSON().tags[0], tag1.get('id'))
          assert.is(task1.getRawJSON().tags[1], tag2.get('id'))
          assert.is(tag1.getRawJSON().tasks[0], task1.get('id'))
          assert.is(tag2.getRawJSON().tasks[0], task1.get('id'))

        })

        it('should share the same reference', function()
        {
          // same reference
          assert.is(tag1.get('tasks').first(), task1)
        })

        it('should update and not overwrite', function()
        {
          // verify overwrite
          task2.get('tags').add([tag1, tag2])
          task2.save()


          assert.is(task1.get('tags').length, 2)
          assert.is(task2.get('tags').length, 2)
          assert.is(tag1.get('tasks').length, 2)
          assert.is(tag2.get('tasks').length, 2)


          // verify data is saved
          assert.is(task1.getRawJSON().tags[0], tag1.get('id'))
          assert.is(task1.getRawJSON().tags[1], tag2.get('id'))
          assert.is(tag1.getRawJSON().tasks[0], task1.get('id'))
          assert.is(tag2.getRawJSON().tasks[0], task1.get('id'))


          assert.is(tag1.getRawJSON().tasks[1], task2.get('id'))
          assert.is(tag2.getRawJSON().tasks[1], task2.get('id'))
          assert.is(task2.getRawJSON().tags[0], tag1.get('id'))
          assert.is(task2.getRawJSON().tags[1], tag2.get('id'))

        })
      });


      describe('removing', function()
      {
        it('should remove', function()
        {
          // remove tag1 from task1
          var first = task1.get('tags').first()
          task1.get('tags').remove(first)
          task1.save()


          assert.is(task1.get('tags').length, 1)
          assert.is(task2.get('tags').length, 2)
          assert.is(tag1.get('tasks').length, 1)
          assert.is(tag2.get('tasks').length, 2)

          assert.is(tag1.getRawJSON().tasks[0], task2.get('id'))
          assert.is(tag2.getRawJSON().tasks[1], task2.get('id'))
          assert.is(task2.getRawJSON().tags[0], tag1.get('id'))
          assert.is(task2.getRawJSON().tags[1], tag2.get('id'))

        })
      });
    });


    describe('store', function()
    {
      var parent, child

      beforeEach(function()
      {
        TestUtils.reset()
        parent = App.models.Task.prototype.global.create({content: 'new parent'})
        child = App.models.Task.prototype.global.create({content: 'child 1'})
      })

      describe('when creating', function()
      {

        it('should use the same references as global', function()
        {
          // add child
          var p = App.models.Task.findOrCreate({id: parent.get('id')})
          p.get('children').add(child)
          p.save()

          // same reference as parent
          assert.is(p, parent)


          // reset
          TestUtils.reset()

          // get by parent id and compare reference
          p = App.models.Task.prototype.global.findBy(parent.get('id'))
          assert.is(p.get('id'), parent.get('id'))
          assert.isnt(p, parent)
          assert.is(p.get('children').length, 1)

          // get by parent id from backbone relational store and compare reference
          var p2 = App.models.Task.findOrCreate({id: parent.get('id')})
          assert.is(p.get('id'), parent.get('id'))
          assert.is(p, p2)
        })
      });

      describe('when destroying', function()
      {
        it('should remove reference from store & global', function()
        {
          // same reference as parent
          var p = App.models.Task.findOrCreate({id: parent.get('id')})
          assert.is(p, parent)

          p.destroy()

          // verify reference is dead
          var p3 = App.models.Task.prototype.global.findBy(parent.get('id'))
          assert.is(p3, null)

          var p2 = App.models.Task.findOrCreate({id: parent.get('id')}, {create: false})
          assert.is(p2, null)
        })
      });

    });
  });
})
