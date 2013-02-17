define([], function()
{
  var Model = Backbone.Model.extend({
    modelName: 'Task',
    defaults:  function()
    {
      return {
        content: ''
      }
    },

    setters: {
    }

  })



  window.App.models['Task'] = window.App.models['Task'] || Model

  return window.App.models['Task']

})