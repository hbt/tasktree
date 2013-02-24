require.config({
  baseUrl: 'assets/js',
  paths:   {

    jquery:        'components/jquery/jquery',
    underscore:    'components/underscore/underscore',
    backbone:      'components/backbone/backbone',
    css:           'components/require-css/css',
    normalize:     'components/require-css/normalize',
    'css-builder': 'components/require-css/css-builder',

    knockout:            'vendor/knockout/knockout',
    'underscore_string': 'vendor/underscore.string/underscore.string',
    backboneStore:       'vendor/backbone-localstorage/backbone.localStorage',

    keyboardSimulator: 'customized-vendor/jquery-plugins/send-keys/keyboard-simulator',
    'knockback-lib':   'customized-vendor/knockback/knockback'
  },
  map:     {
    '*': {
      'css': 'components/require-css/css'
    }
  },

  shim: {
    'knockback-lib': {
      deps: ['jquery', 'backbone']
    },
    'backbone':      {
      deps: ['underscore', 'jquery']
    }
  }
});

require(['require', 'jquery',
  // not in arguments
  'underscore_string', 'knockback-lib', 'backbone'
  ],
  function(require, $)
  {
    // load knockback + knockout + backbone deps
    require(['knockback', 'knockout', 'customized-vendor/backbone-plugins/backbone-getters-setters', 'backboneStore'], function(kb, ko)
    {
      window.ko = ko

      // TODO(hbt) Refactor (low): abstract in utils
      _.events = {}
      _.extend(_.events, Backbone.Events);
      _.mixin({
        copy: function(object)
        {
          return jQuery.extend(true, {}, object)
        }
      })

      require(['core/app'], function(App)
      {

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
