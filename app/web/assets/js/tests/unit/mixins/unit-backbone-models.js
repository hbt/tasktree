define(['mixins/backbone-models', 'utils/tests/helpers', 'models/tag', 'models/task'],
  function(Mixins, TestUtils, Tag, Task)
  {
    describe('Mixins backbone models', function()
    {
      describe('relations', function()
      {
        describe('setup | when initializing the relations', function()
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


        describe('Backbone.Model.set', function()
        {
          describe('many to many', function()
          {
            var task, tag
            before(function()
            {
              TestUtils.reset()
              task = App.collections.Tasks.global.create({content: 'new'})
              tag = App.collections.Tags.global.create({content: 'tag1'})
            })

            it('should save ids both ways', function()
            {
              task.save({tags: [tag]})

              assert.is(task.get('tags')[0], tag.get('id'))
              assert.is(task.get('tags').length, 1)

              assert.is(tag.get('tasks')[0], task.get('id'))
              assert.is(tag.get('tasks').length, 1)
            })

            describe('when adding a new element', function()
            {
              it('should update both entitites | should not overwrite', function()
              {
                var ntag = App.collections.Tags.global.create({content: 'tag2'})
                ntag.save('tasks', task)

                console.log(ntag, tag, task)

                assert.is(task.get('tags').length, 2)
                assert.is(task.get('tags')[0], tag.get('id'))
                assert.is(task.get('tags')[1], ntag.get('id'))

                assert.is(ntag.get('tasks')[0], task.get('id'))
                assert.is(ntag.get('tasks').length, 1)
              })
            });


            describe('when removing an element', function()
            {
              xit('should update both entitites', function()
              {

              })
            })


            // TODO(hbt) remove
            xit('should replace value when doing direct set', function()
            {
              var ntag = App.collections.Tags.global.create({content: 'tag2'})
              ntag.save('tasks', task)

              console.log(ntag, tag, task)

              assert.is(task.get('tags').length, 2)
              assert.is(task.get('tags')[0], tag.get('id'))
              assert.is(task.get('tags')[1], ntag.get('id'))

              assert.is(ntag.get('tasks')[0], task.get('id'))
              assert.is(ntag.get('tasks').length, 1)
            })
          });


          describe('one to many', function()
          {
            var task
            before(function()
            {
              TestUtils.reset()
              task = App.collections.Tasks.global.create({content: 'parent'})
            })

            xit('should save ids both ways', function()
            {
              var children = []
              _.times(3, function(i)
              {
                children.push(App.collections.Tasks.global.create({content: 'child ' + i}))
              })
              task.save({children: children})

//              assert.is(task.get('tags')[0], tag.get('id'))
//              assert.is(task.get('tags').length, 1)
//
//              assert.is(tag.get('tasks')[0], task.get('id'))
//              assert.is(tag.get('tasks').length, 1)
            })

            xit('should replace value when doing direct set', function()
            {

            })
          });
        });
      });
    });
  })
