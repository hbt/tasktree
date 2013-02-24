define(['require', 'utils/tests/runner'], function(require, TestRunner)
{
  var Router = Backbone.Router.extend({

    routes: {
      '':      'main',
      'tests': 'tests'
    },
    tests:  function()
    {
      TestRunner.init()
    },

    main: function()
    {
      if(App.config.envName === 'dev' && window.location.hash.indexOf('tests') === -1)
      {
        TestRunner.insertLink()
      }
    }
  });

  return Router;
})