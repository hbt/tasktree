define([], function()
{
  angular.module('tasktree').controller('Main',
    function($log, $scope, Config)
    {
      // TODO(hbt) add router + $location to launch /#tests
      if(Config.envName === 'dev')
      {
        require(['utils/debug'], function(DebugUtils)
        {
          DebugUtils.init();
        })
      }
    }
  );
})

