define(['mixins/backbone-collections'], function(Mixins)
{
  describe('Mixins backbone collections', function()
  {
    // TODO(hbt) check two collections do not have the same global
    describe('extendCollection | modify backbone collections prototype', function()
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
      describe('create', function()
      {

      });
    });
  });
})
