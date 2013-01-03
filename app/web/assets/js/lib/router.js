define(['require'], function(require)
{
  var Router = Backbone.Router.extend({

    routes: {
      'tests': 'tests'
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

        // TODO(hbt) add namespace for tests so space is unique
        // TODO(hbt) add clean up function before starting tests
        _.each(_.keys(localStorage), function(key)
        {
//          if(_s.startsWith(key, window.App.config.namespace))
          if(_s.startsWith(key, 'tasktree-'))
          {
            localStorage.removeItem(key)
          }
        })

        // TODO(hbt) add loop through module tests
        require(['test/metadata', 'test/sanity', 'modules/tag/tests/init', 'modules/status/tests/init',
          'modules/status/tests/init', 'modules/capture/tests/init'], function()
        {
          // TODO(hbt) change all links and add #tests + remove route '' => #tests
          mocha.run(function()
          {
            // append #tests to all links to enter the #tests backbone route
            var links = $('#mocha').find('a')
            _.each(links, function(link)
            {
              link = $(link)
              if(link.attr('href').indexOf('#tests') === -1)
              {
                link.attr('href', link.attr('href') + '#tests')
              }
            })
          });
        });

      })
    }
  });

  return Router;
})