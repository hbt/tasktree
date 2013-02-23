define(['components/chai/chai', 'components/mocha/mocha'], function(chai)
{
  window.assert = chai.assert;

  var Runner = {
    init: function()
    {
      // add link to run mocha tests
      $(document).ready(function()
      {
        var div = document.createElement('div')
        div.innerHTML = '<a href="?#tests">Run tests</a>'
        div.id = 'mocha'
        $(div).insertBefore($('#messages-container'))
      })


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

      // TODO(hbt) Feature: detect when tests has no assert i.e "it" but empty function + mark it as pending -- check duration



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