define([], function()
{
  var Router = Backbone.Router.extend({

    routes: {
      'tests': 'tests'
    },
    tests:  function()
    {
      require(['components/chai/chai', 'components/mocha/mocha'], function(chai)
      {
        // Chai
        window.assert = chai.assert;

        // Mocha
        mocha.setup({
          ignoreLeaks: true,
          ui:          'bdd'
        })


        require(['test/sanity'], function()
        {
          mocha.run();
        });
      })
    }
  });

  return Router
})