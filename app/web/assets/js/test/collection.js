define(['lib/collection'], function(DataCollection)
{
  // TODO(hbt) migrate to its own test file
  describe('collections | tests collection pattern and its references', function()
  {
    describe('getById | loads object in global collection and all other instances refer to the same reference', function()
    {
      xit('new collections share the same references for models', function()
      {
        var coll = new DataCollection()
        var model = coll.create({content: 'new stuff'})

        assert.is(coll.global, window.App.collections.Data, 'refers to the global collection')
        assert.is(window.App.collections.Data.getById(model.get('id')), model, 'getById returns the same reference')
        assert.is(model.collection, window.App.collections.Data, 'model has global collections as its collection')
        assert.is(coll._byId[model.get('id')], model, 'new collections point to the same model reference')
      })

      describe('garbage collection', function()
      {
        xit('should loop through existing collections and verify which references are no longer uses and clean the global collections', function()
        {

        })
      });
    });
  });
})
