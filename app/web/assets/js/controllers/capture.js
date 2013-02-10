define([], function()
{
  angular.module('tasktree').controller('Capture',
    function($log, $scope, Config)
    {
      $scope.task = {
        content: ''
      }



      var actions = {
       save: function()
       {
//         TaskManager.save();
       }
      }

      $scope.save = actions.save


    }
  );
})
