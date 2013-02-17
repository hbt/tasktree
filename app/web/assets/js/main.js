// TODO(hbt) clean up imports and remove unused stuff
// TODO(hbt) add bower-packages + ignore or move to customized-vendor
require.config({
  baseUrl: 'assets/js',
  paths:   {
    jquery:              'components/jquery/jquery',
    underscore:          'components/underscore-amd/underscore',
    backbone:            'vendor/backbone/backbone',
    knockout:            'vendor/knockout/knockout',
    'underscore_string': 'components/underscore.string/lib/underscore.string',
    text:                'components/requirejs-text/text',
    backboneStore:       'components/backbone.localStorage/backbone.localStorage',
    keyboardSimulator:   'lib/utils/keyboard-simulator',
    handlebars:          'components/require-handlebars-plugin/Handlebars',
    hbs:                 'components/require-handlebars-plugin/hbs',
    i18nprecompile:      'components/require-handlebars-plugin/hbs/i18nprecompile',
    json2:               'components/require-handlebars-plugin/hbs/json2',
    css:                 'components/require-css/css',
    normalize:           'components/require-css/normalize',
    'css-builder':       'components/require-css/css-builder',
    'knockback-lib':     'customized-vendor/knockback/knockback'
  },
  map:     {
    '*': {
      'css': 'components/require-css/css'
    }
  },

  shim: {
    'knockback-lib': {
      deps: ['jquery']
    }
  }
});

require(['require', 'jquery',
  // not in arguments
  'lib/utils/global', 'underscore_string', 'knockback-lib',
  // TODO(hbt) move to test
  'css!components/mocha/mocha'],
  function(require, $)
  {
    require(['knockback', 'knockout'], function(kb, ko)
    {
      window.ko = ko
      require(['lib/core'], function(App)
      {
        // TODO(hbt) abstract in utils
        _.events = {}
        _.extend(_.events, Backbone.Events);
        _.mixin({
          copy: function(object)
          {
            return jQuery.extend(true, {}, object)
          }
        })

        App.init(function()
        {
          $(document).ready(function()
          {
            Backbone.history.start()
            kb.injectViewModels();
          })
        })

      })

    })
  })
