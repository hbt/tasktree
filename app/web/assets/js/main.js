require({
  baseUrl: 'assets/js',
  paths:   {
    jquery:              'components/jquery/jquery',
    underscore:          'components/underscore/underscore',
    'underscore-string': 'components/underscore.string/lib/underscore.string',
    'angular':           'components/angular/angular'
  },

  shim: {

    'app':           {
      deps: ['angular']
    },
    'lib/bootstrap': {
      deps: ['app']
    }
  }
}, ['require', 'jquery', 'app'], function(require)
{
  require(['controllers/main'], function()
  {
    return require(['bootstrap']);
  })
});


// TODO(hbt) clean up
//require(['require', 'components/jquery/jquery'], function(require)
//{
//  jQuery = null
//  require(['components/angular/angular'], function()
//  {
//    console.log(jQuery)
//
////    var tasktree = window.tasktree =  angular.module('tasktree', []);
////  console.log($scope)
//
////  console.log($)
//
//    angular.module('tasktree').controller('Ctrl', function Ctrl($scope, $location)
//    {
//      console.log($scope)
//      $scope.stuff = 'hello'
//    })
//
//    angular.module('tasktree').run([
//      '$rootScope', '$log', function($rootScope, $log)
//      {
//        return $rootScope.$on('$routeChangeSuccess', function(event, currentRoute, priorRoute)
//        {
//          return $rootScope.$broadcast("" + currentRoute.controller + "$routeChangeSuccess", currentRoute, priorRoute);
//        });
//      }
//    ]);
//
//
//    angular.bootstrap(document, ['tasktree'])
//
//
//  })
////  angular.bootstrap(null, ['tasktree'])
//})
//require.config({
//  baseUrl: 'assets/js',
//  paths:   {
//    jquery:              'components/jquery/jquery',
//    underscore:          'components/underscore-amd/underscore',
//    'underscore_string': 'components/underscore.string/lib/underscore.string',
//    backbone:            'components/backbone-amd/backbone',
//    text:                'components/requirejs-text/text',
//    backboneStore:       'components/backbone.localStorage/backbone.localStorage',
//    keyboardSimulator:   'lib/utils/keyboard-simulator',
//    handlebars:          'components/require-handlebars-plugin/Handlebars',
//    hbs:                 'components/require-handlebars-plugin/hbs',
//    i18nprecompile:      'components/require-handlebars-plugin/hbs/i18nprecompile',
//    json2:               'components/require-handlebars-plugin/hbs/json2',
//    css:                 'components/require-css/css',
//    normalize:           'components/require-css/normalize',
//    'css-builder':       'components/require-css/css-builder'
//  },
//  map:     {
//    '*': {
//      'css': 'components/require-css/css'
//    }
//  }
//});
//
//
//require(['require', 'jquery', 'lib/core',
//
//  // not used in params
//  'backbone', 'underscore', 'lib/utils/global', 'underscore_string',
//  'css!components/mocha/mocha'
//],
//
//  function(require, $, App)
//  {
//    _.events = {}
//    _.extend(_.events, Backbone.Events);
//    // TODO(hbt) abstract in utils
//    _.mixin({
//      copy: function(object) {
//       return jQuery.extend(true, {}, object)
//      }
//    })
//
//    App.init(function()
//    {
//      $(document).ready(function()
//      {
//        Backbone.history.start()
//      })
//    })
//  })