define([], function()
{
  describe('Metadata | information about data', function()
  {
    // TODO(hbt) implement metadata tests
    describe('when adding metada', function()
    {
      describe('data metadata relationship', function()
      {
        var model, metadata

        it('data should have metadata', function()
        {
          // add metadata as json
          model = window.App.collections.Data.create({content: 'new task'})
          model.addMetadata({content: 'some meta'})

          assert.is(model.get('metadata').length, 1, 'adds metadata')
          assert.is(model.getMetadata().at(0).get('content'), 'some meta', 'accessible via helper')

          assert.is(model.getMetadata().at(0).get('isMetadata'), true, 'differentiates data from metadata')
          assert.is(model.get('isMetadata'), false, 'differentiates data from metadata')

          // add metadata as object
          metadata = window.App.collections.Metadata.createUnique({content: 'new meta'})
          model.addMetadata(metadata)

          assert.is(model.get('metadata').length, 2, 'adds new metadata')
          assert.is(model.getMetadata().at(1).get('content'), 'new meta', 'helper')
          assert.is(model.getMetadata().length, 2, 'check meta collection')

          // backbone defaults use a function to prevent issue with references
          assert.is(model.getMetadata().at(1).get('metadata').length, 0, 'defaults references')
          assert.is(model.get('children').length, 0, 'defaults references')
          assert.is(model.getMetadata().at(0).get('metadata').length, 0, 'defaults references')
        })

        it('metadata should track data as a child', function()
        {
          assert.is(model.getMetadata().at(0).getChildren().length, 1, 'metadata has data')
          assert.is(model.getMetadata().at(0).getChildren().at(0).get('id'), model.get('id'), 'getChildren returns collection of data')
          assert.is(metadata.getChildren().length, 1)
        })

        it('metadata + data should point to the same references', function()
        {
          assert.is(model, metadata.getChildren().at(0))
          assert.is(metadata, model.getMetadata().at(1))

        })
      });

      describe('uniqueness', function()
      {
        xit('metadata is tracked by content which is unique', function()
        {
          var length = window.App.collections.Metadata.length

          var metadata = window.App.collections.Metadata.createUnique({content: 'new meta'})
          metadata = window.App.collections.Metadata.createUnique({content: 'new meta'})

          assert.is(window.App.collections.Metadata.length, length + 1)
        })

        xit('metadata and data collections both contain unique id references', function()
        {
          var metadata = window.App.collections.Metadata.createUnique({content: 'new meta'})
          var model = window.App.collections.Data.create({content: 'new task'})
          model.addMetadata(metadata)
          model.addMetadata({content: 'new meta '})

          assert.is(model.getMetadata().length, 1)
          assert.is(metadata.getChildren().length, 1)
        })
      });
    });

    describe('when removing medata', function()
    {
      xit('data should no longer have metadata', function()
      {
      })

      xit('medata should not have data as a child', function()
      {
      })
    });
  })


  // TODO(hbt) migrate to its own test file
  describe('collections | tests collection pattern and its references', function()
  {
    describe('getById | loads object in global collection and all other instances refer to the same reference', function()
    {
      it('new collections share the same references for models', function()
      {
        var ca = new window.App.collectionClasses.Data()
        var model = ca.create({content: 'new stuff'})

        assert.is(ca.global, window.App.collections.Data, 'refers to the global collection')
        assert.is(window.App.collections.Data.getById(model.get('id')), model, 'getById returns the same reference')
        assert.is(model.collection, window.App.collections.Data, 'model has global collections as its collection')
        assert.is(ca._byId[model.get('id')], model, 'new collections point to the same model reference')
      })

      describe('garbage collection', function()
      {
        xit('should loop through existing collections and verify which references are no longer uses and clean the global collections', function()
        {

        })
      });
    });
  });
});
