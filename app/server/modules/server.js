(function()
{
  var express = require('express');
  var app = express();

  app.get('/', function(req, res)
  {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('main');
  });

  // TODO(hbt) organize url modules + calls i.e modules/controllers/controllerName/actionName
  app.get('/tests/purpose_crash', function(req, res)
  {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('down');
    // disable error handler
    process.removeAllListeners('uncaughtException')

    // start the server on the same port to crash it
    exports.start()
  })

  exports.start = function()
  {
    // TODO(hbt) abstract config
    app.listen(3000);
  }
})()
