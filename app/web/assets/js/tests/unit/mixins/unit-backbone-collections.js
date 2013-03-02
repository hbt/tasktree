define(['mixins/backbone-collections', 'utils/tests/helpers'], function(Mixins, TestUtils)
{
  describe('Mixins backbone collections', function()
  {
    // TODO(hbt) Feature: check two collections do not have the same global
    describe('extend | modify backbone collections prototype', function()
    {
      var Collection, coll
      beforeEach(function()
      {
        Collection = App.collectionClasses.Tasks
        coll = new Collection()
      })

      it('should add helpers to instances but not classes', function()
      {
        Mixins.extend(Collection)
        _.each(Mixins.helpers, function(v, k)
        {
          assert.isnt(coll[k], undefined)
          assert.is(Collection[k], undefined)
        })
      })

      it('should create a global collection instance', function()
      {
        assert.isnt(Collection.prototype.global, undefined)
      })

      it('global collection should be available to all collection instances', function()
      {
        assert.isnt(coll.global, undefined)
      })

      it('global collection should be available to all model instances', function()
      {
        var model = new Collection.prototype.model()
        assert.isnt(model.global, undefined)
      })
    });

    describe('helpers', function()
    {
      describe('Backbone.Collection.create', function()
      {
        describe('unique fields', function()
        {
          var tag, tags
          before(function()
          {
            TestUtils.reset()
            tags = App.collections.Tags
            tags.fetch()
            assert.is(tags.length, 0)
            assert.is(tags.global.length, 0)

            tag = tags.create({content: 'project'})
            assert.is(tags.length, 1)
            assert.is(tags.global.length, 1)
          })

          describe('when creating a model', function()
          {
            it('should look up the model by unique value and use that reference instead', function()
            {
              var tag2 = tags.create({content: 'project'})
              assert.is(tag, tag2)
            })


            it('should fetch when the model is not found', function()
            {
              // reset the collection
              var id = tag.get('id')
              tags.reset()
              tags.global.reset()
              assert.is(tags.global.length, 0)
              assert.is(_.size(tags.global._byUnique[tags.unique]), 0)


              // will run a fetch and not create a new one
              var ntag = tags.create({content: 'project'})
              assert.is(ntag.get('id'), id)
              assert.isnt(ntag, tag)
              tag = ntag
            })


            it('should not create a new model', function()
            {
              assert.is(tags.length, 1)
              assert.is(tags.global.length, 1)
            })
          });

          describe('when destroying a model', function()
          {
            it('should return undefined when doing a look up', function()
            {
              // create & destroy
              var dtag = tags.create({content: 'gone'})
              assert.is(dtag, tags.global._byUnique[tags.unique]['gone'])
              dtag.destroy()
              assert.is(tags.length, tags.global.length)


              // look up by value
              assert.is(undefined, tags.global._byUnique[tags.unique]['gone'])
            })
          });

          describe('when updating a model', function()
          {
            beforeEach(function()
            {
              TestUtils.reset()
            })
            it('should update the index + keep the same references', function()
            {
              var tag = tags.create({content: 'project'})
              var ntag = tags.create({content: 'project'})
              assert.is(tags.length, 1)
              assert.is(ntag, tag)


              // update
              ntag.save({content: 'new-project'})
              assert.is(tag.get('content'), 'new-project')
              var utag = tags.create({content: 'new-project'})
              assert.is(utag, ntag)
              assert.is(ntag, tag)
            })
          });
        });
      });
    });
  });
})
