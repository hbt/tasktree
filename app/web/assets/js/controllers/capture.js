define([], function()
{
  angular.module('tasktree').controller('Capture',
    function($log, $scope, Config)
    {
      $scope.task = {
        content: localStorage['ww']
      }

      $scope.$watch('task.content', function()
      {
        console.log('change')
      })


      var actions = {
       save: function()
       {
//         TaskManager.save();
         console.log('as', $scope.task)
         $scope.task.content = ''
         console.log($scope.task)
         localStorage['ww'] = 'nn'
       }
      }

      $scope.save = actions.save
    }
  );
})
