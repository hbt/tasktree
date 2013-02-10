define(['config/config'], function(config)
{
  angular.module('tasktree').service('Config',
    function()
    {
      return config
    }
  );
})


