define([], function()
{
  var Config = {
    'serverURL':       'http://192.168.0.100:3000',
    'debugVersionURL': 'http://192.168.0.100:9093',
    'envName':         'dev',
    'skipCrashTests':  'true' === 'true',
    // TODO(hbt) only generate timestamp on if location has #tests
    'namespace':       'tasktree-' + (+new Date())
  }

  // TODO(hbt) make namespace a function and loop through it
  // TODO(hbt) abstract code in ConfigurationUtils

  window.App.config = window.App.config || Config

  return window.App.config
})
