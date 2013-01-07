(function()
{
  require('./utils/global')
  var express = require('express');
  var app = express();

  app.configure(function()
  {
    // used to parse JSON -- req.body
    app.use(express.bodyParser());
  });

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

  // TODO(hbt) abstract with other test functions
  app.post('/tests/cov', function(req, res)
  {
    res.header('Access-Control-Allow-Origin', '*');
    if(config.envName === 'dev')
    {
      var fs = require('fs')
      // TODO(hbt) use path resolve
      var dir = __dirname + '/../../'

      // write frontend + backend coverage results to file
      var frontendCoverage = req.body
      fs.writeFileSync(dir + '/frontend-coverage.json', frontendCoverage.cov, 'utf8')
      fs.writeFileSync(dir + '/backend-coverage.json', JSON.stringify(GLOBAL.coverage), 'utf8')

      var exec = require('child_process').exec;
      exec('grunt clean-instrumented', function()
      {
        exec('grunt generate-report', function()
        {
          res.send('done')
        })
      })
    }
    else
    {
      res.send('not available')
    }
  })

  exports.start = function()
  {
    app.listen(config.serverPort);
  }
})()
