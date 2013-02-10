define(['require'], function(require)
{
  return (function()
  {
    var exports = {}

    var Tests = {
      init: function()
      {
        // add shortcuts to run tests
        $(document).ready(function()
        {
          var div = document.createElement('div')
          div.innerHTML = '<a href="?#tests">Run tests</a>'
          div.id = 'mocha'
          $(div).insertBefore($(document.body.firstChild))
        })

        require(['chai', 'mocha'], function(chai)
        {
          // Chai
          window.assert = chai.assert;

          // Mocha
          mocha.setup({
            ignoreLeaks: true,
            ui:          'bdd'
          })

          // TODO(hbt) generate
          require(['tests/functional/capture'], function()
          {
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

              var pendingTests = $('#mocha .pending > h2')
              _.each(pendingTests, function(pendingTest)
              {
                pendingTest = $(pendingTest)
                pendingTest.html('[*] --  ' + pendingTest.html())
              })

              var stats = $('#mocha-stats')
              var pending = $('<li/>').html('pending: ' + pendingTests.length)
              stats.prepend(pending)

              // TODO(hbt) add one-liner link i.e if the one test fails -- display "FAILURE"

              // TODO(hbt) add link to hide pending and only show passed/failures

              // TODO(hbt) detect when tests has no assert i.e "it" but empty function -- check duration

              // TODO(hbt) add link start -- check *s


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
            })
          })
        })
      }
    }

    exports.init = function()
    {
      require(['utils/debug/reload'], function(Reloader)
      {
        Reloader.init()
        Tests.init()
      })
    }
    return exports
  })()
})