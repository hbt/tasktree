require.config({
  baseUrl: 'assets/js',
  paths:   {
    jquery:     'components/jquery/jquery',
    underscore: 'components/underscore-amd/underscore',
    backbone:   'components/backbone-amd/backbone'
  }
});


require(['require', 'jquery', 'components/chai/chai',

  // not used in params
  'lib/core', 'backbone', 'underscore', 'lib/utils/global'],

  function(require, $)
  {
    window.App.init(function()
    {
      $(document).ready(function()
      {
        Backbone.history.start()
      })
    })
  })
