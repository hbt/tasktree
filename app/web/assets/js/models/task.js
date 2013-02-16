define([], function()
{
  // TODO(hbt) abstract + implement + add collection
  var Model = Backbone.Model.extend({
    modelName: 'Task',
    defaults:  function()
    {
      return {
        content: ''
      }
    }
  })

  window.App.models['Task'] = window.App.models['Task'] || Model
  // TODO(hbt) inv how to add functions that will only be available in the modules

  return window.App.models['Task']
  
})