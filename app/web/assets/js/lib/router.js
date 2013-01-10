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

        // TODO(hbt) rename /test to /tests -- directory to match modules
        // TODO(hbt) add loop through module tests
        require(['test/metadata', 'test/sanity', 'modules/tag/tests/init', 'modules/status/tests/init',
          'modules/status/tests/init', 'modules/capture/tests/init'], function()
        {
          // TODO(hbt) change all links and add #tests + remove route '' => #tests
          mocha.run(function()
          {
            // TODO(hbt) abstract
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

            // TODO(hbt) abstract
            // send coverage
            // TODO(hbt) abstract or replace __coverage__ by a camelcase string -- then re-enable hintrc camelcase support
            if(typeof __coverage__ !== 'undefined')
            {
              $.ajax({
                url:         App.config.serverURL + '/tests/cov',
                data:        {cov: JSON.stringify(__coverage__)},
                type:        'POST',
                crossDomain: true,
                success:     function()
                {
                  window.location.href = '/coverage-report/index.html'
                }
              });
            }
          });
        });

      })
    }
  });

  return Router;
})