(function()
{
  require('./utils/global')
  var express = require('express');
  var app = express();

  var config = require('./../config/config').config

  app.get('/', function(req, res)
  {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('up');
  });

  // TODO(hbt) organize url modules + calls i.e modules/controllers/controllerName/actionName
  app.get('/tests/purpose_crash', function(req, res)
  {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('down');

    if(config.skipCrashTests)
    {
      return;
    }

    // disable error handler
    process.removeAllListeners('uncaughtException')

    // start the server on the same port to crash it
    exports.start()
  })

  exports.start = function()
  {
    app.listen(config.serverPort);
  }
})()
