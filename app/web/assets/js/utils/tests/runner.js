define(['components/chai/chai', 'components/mocha/mocha', 'css!components/mocha/mocha'], function(chai)
{

  // add custom asserts
  chai.Assertion.includeStack = true
  chai.assert.is = function(act, exp, msg)
  {
    new chai.Assertion(act, msg).to.equal(exp)
  };

  chai.assert.isnt = function(act, exp, msg)
  {
    new chai.Assertion(act, msg).to.not.equal(exp);
  };
  window.assert = chai.assert;

  var Runner = {

    /**
     * add link to run mocha tests
     */
    insertLink: function()
    {
      $(document).ready(function()
      {
        var div = document.createElement('div')
        div.innerHTML = '<a href="?#tests">Run tests</a>'
        div.id = 'mocha'
        $(div).insertBefore($('#messages-container'))
      })
    },

    init: function()
    {
      this.insertLink()


      // config Mocha
      mocha.setup({
        ignoreLeaks: true,
        ui:          'bdd'
      })


      this.cleanState()

      var self = this
      require(this.getTestFiles(), function()
      {
        mocha.run(self.run)
      })
    },

    run: function()
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


      // add a prefix to all pending tests -- to differentiate them easily
      var pendingTests = $('#mocha .pending > h2')
      _.each(pendingTests, function(pendingTest)
      {
        pendingTest = $(pendingTest)
        pendingTest.html('[*] --  ' + pendingTest.html())
      })


      // modify statistics to display nb of pending tests
      var stats = $('#mocha-stats')
      var pending = $('<li/>').html('pending: ' + pendingTests.length)
      stats.prepend(pending)

      // TODO(hbt) Feature: add one-liner link i.e if the one test fails -- display "FAILURE"

      // TODO(hbt) Feature: add link to hide pending and only show passed/failures


      Runner.findFalsePositives(mocha.suite.suites)


      // send coverage if we are running grunt coverage
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
    },


    /**
     * loops through the tests and looks for functions that are defined as it instead of xit
     * i.e lack asserts but show up as "passed" when they should show up as "pending"
     */
    findFalsePositives: function(suites)
    {
      var self = this
      _.each(suites, function(suite)
      {
        if(suite.tests.length)
        {
          _.each(suite.tests, function(test)
          {
            if(test.fn)
            {
              if(test.fn.toString().indexOf('assert') === -1)
              {
                console.error(['No asserts found', 'should be a xit and not it', test.title, test])
              }
            }
          })
        }
        else
        {
          self.findFalsePositives(suite.suites)
        }
      })
    },

    /**
     * empties local storage to prevent collision with previous test runs
     */
    cleanState: function()
    {
      _.each(_.keys(localStorage), function(key)
      {
        if(_s.startsWith(key, 'tasktree-'))
        {
          localStorage.removeItem(key)
        }
      })
    },

    /**
     * returns list of test files
     */
    getTestFiles: function()
    {
      // TODO(hbt) Feature: generate this list

      return ['tests/functional/view-model/fn-list-one', 'tests/functional/view-model/fn-capture',
        'tests/unit/mixins/unit-backbone-collections', 'tests/functional/services/fn-msg']
    }

  }

  return Runner
})