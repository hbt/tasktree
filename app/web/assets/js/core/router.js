// TODO(hbt) Refactor (high):
define(['require', 'utils/tests/runner'], function(require, TestRunner)
{
  var Router = Backbone.Router.extend({

    routes: {
      'tests': 'tests'
    },
    tests:  function()
    {
      TestRunner.init()
    }
  });

  return Router;
})