define(['require'], function(require)
{
  var Router = Backbone.Router.extend({

    routes: {
      'tests': 'tests',
      '':      'tests'
    },
    tests:  function()
    {
      // TODO(hbt) add test runner

      require(['components/chai/chai', 'components/mocha/mocha'], function(chai)
      {
        // Chai
        window.assert = chai.assert;

        // Mocha
        mocha.setup({
          ignoreLeaks: true,
          ui:          'bdd'
        })

        // TODO(hbt) add clean up function before starting tests
        _.each(localStorage, function(v, k)
        {
          var key = localStorage.key(k)
          if(_s.startsWith(key, window.App.config.namespace))
          {
            localStorage.removeItem(key)
          }
        })

//        var files = _.map('capture,sanity'.split(','), function(v)
//        {
//          return 'test/' + v
//        })

        c.l('clear')

        require(['test/metadata', 'test/sanity', 'modules/tag/tests/init', 'modules/status/tests/init', 'modules/capture/tests/init'], function()
        {
          mocha.run();
        });

      })
    }
  });

  return Router;
})