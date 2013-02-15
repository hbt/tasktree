define(['./views/capture'], function(CaptureView)
{
  _.events.on('app-init', function()
  {
    // TODO(hbt) make every module initialization without direct effect -- instead listen to the app.init event and then initialize the plugin
    new CaptureView()
  })

  return {
    views: [CaptureView]
  }

})