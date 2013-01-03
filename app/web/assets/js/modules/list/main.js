define(['./views/list'], function(ListView)
{
  _.events.on('app-init', function()
  {
    new ListView()
  })

  return {
    views: [ListView]
  }
})

