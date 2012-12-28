define(['require'], function(require)
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

        var files = _.map('sanity,capture'.split(','), function(v)
        {
          return 'test/' + v
        })

        require(files, function()
        {
          mocha.run();
        });
      })
    }
  });


  var router = new Router()
  window.App.Router = window.App.Router || router

  return window.App.Router
})