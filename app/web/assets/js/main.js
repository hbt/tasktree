require({
    baseUrl: 'assets/js',
    paths:   {
      angular:              'components/angular/angular',
      // TODO(hbt) consider removing
      'angular-scenario':   'libs/angular/angular-scenario',
      'angular-ui':         'components/angular-ui/build/angular-ui',
      backbone:             'components/backbone/backbone',
      chai:                 'libs/chai/chai',
      jquery:               'components/jquery/jquery',
      'keyboard-simulator': 'utils/keyboard-simulator',
      mocha:                'components/mocha/mocha',
      underscore:           'components/underscore/underscore',
      'underscore-string':  'components/underscore.string/lib/underscore.string'
    },

    shim: {
      'angular-ui':             {
        deps: ['angular']
      },
      'app':                    {
        deps: ['angular', 'angular-ui']
      },
      'services/configuration': {
        deps: ['app']
      },
      'utils/utils':            {
        deps: ['backbone']
      },
      'backbone':               {
        deps: ['underscore']
      }
    }
  }, ['require', 'jquery', 'backbone', 'underscore', 'underscore-string', 'app', 'services/configuration', 'utils/utils'],
  function(require)
  {
    // TODO(hbt) add a generator to list and load all controllers
    require(['controllers/main', 'controllers/capture'], function()
    {
      return require(['bootstrap']);
    })
  });
