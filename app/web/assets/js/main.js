require.config({
  baseUrl: 'assets/js',
  paths:   {
    jquery:            'components/jquery/jquery',
    underscore:        'components/underscore-amd/underscore',
    backbone:          'components/backbone-amd/backbone',
    text:              'components/requirejs-text/text',
    backboneStore:     'components/backbone.localStorage/backbone.localStorage',
    keyboardSimulator: 'lib/utils/keyboard-simulator',
    handlebars:        'components/require-handlebars-plugin/Handlebars',
    hbs:               'components/require-handlebars-plugin/hbs',
    i18nprecompile:    'components/require-handlebars-plugin/hbs/i18nprecompile',
    json2:             'components/require-handlebars-plugin/hbs/json2'
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
