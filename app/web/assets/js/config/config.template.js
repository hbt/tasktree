define([], function()
{
  var Config = {
    'serverURL':       '%%server_url%%',
    'debugVersionURL': '%%debug_version_url%%',
    'envName':         '%%environment_name%%',
    'skipCrashTests':  '%%skip_crash_tests%%' === 'true',
    // TODO(hbt) only generate timestamp on if location has #tests
    'namespace':       'tasktree-' + (+new Date())
  }

  // TODO(hbt) make namespace a function and loop through it
  // TODO(hbt) abstract code in ConfigurationUtils

  window.App.config = window.App.config || Config

  return window.App.config
})
