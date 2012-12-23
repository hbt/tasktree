require('./lib/utils/global')

// TODO(hbt) abstract error handler
process.on('uncaughtException', function(error)
{
  console.log(error.stack)
});

// start server
var server = require('./lib/server')
server.start()