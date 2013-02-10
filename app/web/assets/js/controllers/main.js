define(['services/configuration'], function()
{
  angular.module('tasktree').controller('Main',
    function($log, $scope, Config)
    {
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

