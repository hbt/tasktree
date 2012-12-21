(function()
{
  var express = require('express');
  var app = express();

  app.get('/', function(req, res)
  {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('main');
  });

  exports.start = function()
  {
    // TODO(hbt) abstract config
    app.listen(3000);
  }
})()
