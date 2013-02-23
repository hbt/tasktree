define([], function()
{
  var Config = {
    'serverURL':       '%%server_url%%',
    'debugVersionURL': '%%debug_version_url%%',
    'envName':         '%%environment_name%%',
    'skipCrashTests':  '%%skip_crash_tests%%' === 'true',
    'namespace':       window.location.hash.indexOf('tests') !== -1 ? 'tasktree-' + (+new Date()) : 'tasktree'
  }


  return Config
})
