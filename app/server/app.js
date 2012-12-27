require('./lib/utils/global')
var util = require('util')


function configure()
{

  // Note(hbt) From the node documentation

  //Note that uncaughtException is a very crude mechanism for exception handling and may be removed in the future.
  //Don't use it, use domains instead. If you do use it, restart your application after every unhandled exception!
  //Do not use it as the node.js equivalent of On Error Resume Next. An unhandled exception means your application
  // and by extension node.js itself - is in an undefined state. Blindly resuming means anything could happen.
  //Think of resuming as pulling the power cord when you are upgrading your system. Nine out of ten times nothing happens
  //- but the 10th time, your system is bust.
  //You have been warned.
  process.on('uncaughtException', function(error)
  {
    // TODO(hbt) send email (with delay) when it crashes on production #13
    util.error(util.format('\n\n-----------\n\n%s\n\n%s', new Date(), error.stack))
  });
}

function main()
{
  configure()

  // start server
  var server = require('./lib/server')
  server.start()
}


main()



