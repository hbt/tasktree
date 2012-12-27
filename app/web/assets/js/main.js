require.config({
  baseUrl: 'assets/js'
});

require(['require', 'components/jquery/jquery', 'components/chai/chai', 'lib/core',

  // not used in params
  'components/underscore/underscore', 'lib/utils/global'],

  function(require, $, chai, App)
  {
    App.init(function()
    {
      if(window.App.config.envName === 'dev')
      {
        require(['lib/utils/debug/reload'], function(ReloadUtils)
        {
          ReloadUtils.init()
        })
      }

      // TODO(hbt) abstract tests
      require(['components/mocha/mocha'], function()
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
    })
  })
