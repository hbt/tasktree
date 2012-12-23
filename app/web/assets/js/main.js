require.config({
  baseUrl: 'assets/js'
});

require(['require', 'components/jquery/jquery', 'components/chai/chai', 'components/underscore/underscore',
  'lib/core', 'lib/utils/global'], function(require, $, chai)
{
  // TODO(hbt) restrict when in debug mode
  require(['lib/utils/debug/reload'], function(ReloadUtils)
  {
    ReloadUtils.init()
  })

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
