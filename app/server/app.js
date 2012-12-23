// TODO(hbt) abstract error handler
process.on('uncaughtException', function(error)
{
  console.log(error.stack)
});

// start server
var server = require('./modules/server')
server.start()
