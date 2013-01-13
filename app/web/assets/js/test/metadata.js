define(['lib/collection', 'lib/collections/metadata'], function(DataCollection, MetadataCollection)
{
  describe('Model | tests data & metadata', function()
  {
    var model, metadataColl
    beforeEach(function()
    {
      var coll = new DataCollection()

      // init
      metadataColl = new MetadataCollection()
      model = coll.create({content: 'new task'}, {silent: true})
    })

    afterEach(function()
    {
      // reset global references
      _.each(window.App.collectionClasses, function(Coll)
      {
        Coll.prototype.global = null;
        Coll.prototype.createGlobalCollection()
      })
    })

    describe('addMetadata | when adding metadata to data', function()
    {

      it('metadata is different from data', function()
      {
        model.addMetadata({content: 'some meta'})

        assert.is(model.getMetadata().at(0).get('isMetadata'), true)
        assert.is(model.get('isMetadata'), false)
      })

      describe('supports multiple metadata formats', function()
      {
        it('json', function()
        {
          var metadata = model.addMetadata({content: 'some meta'})

          assert.is(model.hasMetadata(metadata), true)
          assert.is(model.get('metadata').length, 1, 'adds metadata')
          assert.is(model.hasMetadata(model.getMetadata().at(0)), true)
          assert.is(model.getMetadata().chain().pluck('attributes').pluck('content').contains('some meta').value(), true, 'accessible via helper')
        })

        it('metadata model', function()
        {
          var metadata = metadataColl.createUnique({content: 'new meta'})
          model.addMetadata(metadata)

          assert.is(model.getMetadata().length, 1)
        })

        xit('arrays', function()
        {


        })

        xit('string', function()
        {

        })
      })

      describe('references', function()
      {
        it('should not use old references | check defaults returns new references', function()
        {
          model.addMetadata({content: 'some meta'})
          model.addMetadata({content: 'other meta'})

          // backbone defaults use a function to prevent issue with references
          assert.is(model.getMetadata().at(1).get('metadata').length, 0)
          assert.is(model.get('children').length, 0)
          assert.is(model.getMetadata().at(0).get('metadata').length, 0)
        })

        it('metadata and data should point to the same references', function()
        {
          var metadata = model.addMetadata({content: 'some meta'})

          assert.is(model, metadata.getChildren().at(0))
          assert.is(metadata, model.getMetadata().at(0))
        })
      });


      describe('check uniqueness of content + references', function()
      {
        it('metadata is tracked by content which is unique', function()
        {
          var metadata = metadataColl.createUnique({content: 'another meta'})
          metadata = metadataColl.createUnique({content: 'another meta'})
          metadataColl.createUnique(metadata.toJSON())

          assert.is(metadataColl.length, 1)
        })

        it('metadata and data collections both contain unique id references', function()
        {
          var metadata = metadataColl.createUnique({content: 'new meta'})
          model.addMetadata(metadata)
          model.addMetadata({content: 'new meta '})

          assert.is(model.getMetadata().length, 1)
          assert.is(metadata.getChildren().length, 1)
        })
      });

    });

    describe('addChild', function()
    {

      describe('is metadata involved?', function()
      {
        describe('yes', function()
        {

          xit('metadata tracks data as a child', function()
          {

          })

        })

        describe('no', function()
        {
          xit('child (data) should know his direct parent (data)', function()
          {

          })
        });
      })
    })

    describe('removeMetadata', function()
    {
      it('data should no longer have metadata', function()
      {
        model.addMetadata([
          {content: 'some meta to be removed'},
          {content: 'meta gone'},
          {content: 'meta out'},
          {content: 'meta stays'}
        ])
        assert.is(model.getMetadata().length, 4)

        // remove object
        model.removeMetadata(model.getMetadata().at(0))
        assert.is(model.getMetadata().length, 3)

        // remove array of json
        model.removeMetadata([
          {content: 'meta gone'},
          {content: 'meta out'}
        ])

        assert.is(model.getMetadata().length, 1)
        assert.is(model.getMetadata().at(0).get('content'), 'meta stays')
      })

      it('medata should not have data as a child', function()
      {
        var metadata = metadataColl.createUnique({content: 'some meta to be removed'})
        assert.is(metadata.getChildren().length, 0)
      })
    });
  })
});
