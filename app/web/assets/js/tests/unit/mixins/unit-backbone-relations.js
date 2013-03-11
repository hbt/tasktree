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

      it('should add', function()
      {
        // add child
        parent.get('children').add(child)
        parent.save()

        assert.is(parent.get('children').pluck('id')[0], child.get('id'))
        assert.is(child.get('parent').get('id'), parent.get('id'))

        child2 = App.models.Task.prototype.global.create({content: 'child 2'})
        parent.get('children').add(child2)
        parent.save()

        assert.is(parent.get('children').pluck('id')[1], child2.get('id'))
        assert.is(child2.get('parent').get('id'), parent.get('id'))
        assert.is(child.get('parent').get('id'), parent.get('id'))

//        assert.is(parent.get('children').pluck('id'))

//        var pid = parent.get('id'), cid = child.get('id')
//        parent = null, child = null
//        console.log(parent, child)
//
//        TestUtils.reset()
        // retrieve

        // verify

        // verify reference
//        assert.is(parent.get('children'))
      })


      xit('should remove', function()
      {

      })


      xit('', function()
      {

      })
    });

    describe('many to many', function()
    {

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
