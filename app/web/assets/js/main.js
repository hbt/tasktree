require.config({
  baseUrl: 'assets/js',
  paths:   {
    jquery:              'components/jquery/jquery',
    underscore:          'components/underscore-amd/underscore',
    'underscore_string': 'components/underscore.string/lib/underscore.string',
    backbone:            'components/backbone-amd/backbone',
    text:                'components/requirejs-text/text',
    backboneStore:       'components/backbone.localStorage/backbone.localStorage',
    keyboardSimulator:   'lib/utils/keyboard-simulator',
    handlebars:          'components/require-handlebars-plugin/Handlebars',
    hbs:                 'components/require-handlebars-plugin/hbs',
    i18nprecompile:      'components/require-handlebars-plugin/hbs/i18nprecompile',
    json2:               'components/require-handlebars-plugin/hbs/json2',
    css:                 'components/require-css/css',
    normalize:           'components/require-css/normalize',
    'css-builder':       'components/require-css/css-builder'
  },
  map:     {
    '*': {
      'css': 'components/require-css/css'
    }
  }
});


require(['require', 'jquery', 'lib/core',

  // not used in params
  'backbone', 'underscore', 'lib/utils/global', 'underscore_string',
  'css!components/mocha/mocha'
],

  function(require, $, App)
  {
    App.init(function()
    {
      $(document).ready(function()
      {
        Backbone.history.start()
      })
    })
  })
