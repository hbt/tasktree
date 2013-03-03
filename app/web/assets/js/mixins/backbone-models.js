define([], function()
{

  var Relation = {
    types: {
      OneMany:  'one_many',
      ManyMany: 'many_to_many',
    }
  }

  Backbone.Model.Relation = Relation

})