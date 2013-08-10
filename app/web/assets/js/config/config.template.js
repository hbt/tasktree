define([], function()
{
  var testMode = window.location.hash.indexOf('tests') !== -1

  var Config = {
    'serverURL':       '%%server_url%%',
    'debugVersionURL': '%%debug_version_url%%',
    'envName':         '%%environment_name%%',
    'testMode':        testMode,
    'databaseName':    testMode ? 'tasktree-test' : 'tasktree',
    'skipCrashTests':  '%%skip_crash_tests%%' === 'true',
    'tags':            [
      // tracks completed tasks
      'completed',

      // tracks incomplete tasks
      'incomplete'
    ]


  }


  return Config
})
