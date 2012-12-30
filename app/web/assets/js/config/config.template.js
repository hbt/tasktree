define([], function()
{
  var Config = {
    'serverURL':       '%%server_url%%',
    'debugVersionURL': '%%debug_version_url%%',
    'envName':         '%%environment_name%%',
    'skipCrashTests':  '%%skip_crash_tests%%' === 'true',
    'namespace':       'tasktree-'
  }

  window.App.config = window.App.config || Config

  return window.App.config
})
