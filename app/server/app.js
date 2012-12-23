require('./utils/global-utils')

// TODO(hbt) abstract error handler
process.on('uncaughtException', function(error)
{
  c.l(error.stack)
});


// start server
var server = require('./modules/server')
server.start()
