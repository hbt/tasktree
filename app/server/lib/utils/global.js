function initDevUtils()
{
  var config = require('./../../config/config').config

  // limit calls to any functions to dev code
  if(config.envName === 'dev')
  {
    var util = require('util')
    l = util.log
    t = console.trace
    t1 = console.time
    t2 = console.timeEnd
    c = console
    c.l = console.log
  }
}

exports = initDevUtils()


