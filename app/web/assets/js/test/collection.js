define(['lib/collection', 'lib/utils/test-utils'], function(DataCollection, TestUtils)
{
  describe('collections | tests collection pattern and its references', function()
  {
    describe('getById | loads object in global collection and all other instances point to the same reference', function()
    {
      describe('is the object in the global collection?', function()
      {
        describe('no', function()
        {
          var model

          before(function()
          {
            var coll = new DataCollection()
            model = coll.create({content: 'task in mem'})

            TestUtils.clearGlobalCollections()

          })

          it('should look it up in the local storage', function()
          {
            var coll = new DataCollection()
            var nmodel = coll.getById(model.get('id'))

            assert.isnt(model, nmodel, 'different reference')
            assert.is(model.get('id'), nmodel.get('id'), 'same id')
            assert.is(coll.length, 0, 'is not added to collection')
            assert.is(coll.global.at(0), nmodel, 'is added to global collection')
          })

          it('adding model to collection should add the right reference', function()
          {
            var coll = new DataCollection()
            var nmodel = coll.create(model)

            assert.isnt(nmodel, model, 'different reference')
            assert.is(coll.at(0), nmodel, 'the reference from global is added instead of the passed reference in parameter')
            assert.is(coll.length, 1, 'no duplicated references')
            assert.is(coll.global.length, 1, 'no duplicated references in global')
          })
        });
      })

//      xit('new collections share the same references for models', function()
//      {
//        var coll = new DataCollection()
//        var model = coll.create({content: 'new stuff'})
//        assert.is(coll.global, window.App.collections.Data, 'refers to the global collection')
//        assert.is(window.App.collections.Data.getById(model.get('id')), model, 'getById returns the same reference')
//        assert.is(model.collection, window.App.collections.Data, 'model has global collections as its collection')
//        assert.is(coll._byId[model.get('id')], model, 'new collections point to the same model reference')
//      })

      describe('garbage collection', function()
      {
        xit('should loop through existing collections and verify which references are no longer uses and clean the global collections', function()
        {

        })
      });
    });
  });
})
