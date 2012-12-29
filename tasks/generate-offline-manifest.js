module.exports = function(grunt)
{
  // TODO(hbt) refactor this. it is messy but it works

  grunt.registerTask('generate-offline-manifest',
    'oofff', function()
    {

      var _ = require('underscore')
      var fs = require('fs');

      var walk = function(dir, done)
      {
        var results = [];
        fs.readdir(dir, function(err, list)
        {
          if(err)
          {
            return done(err);
          }
          var pending = list.length;
          if(!pending)
          {
            return done(null, results);
          }
          list.forEach(function(file)
          {
            file = dir + '/' + file;
            fs.stat(file, function(err, stat)
            {
              if(stat && stat.isDirectory())
              {
                walk(file, function(err, res)
                {
                  results = results.concat(res);
                  if(!--pending)
                  {
                    done(null, results);
                  }
                });
              }
              else
              {
                results.push(file);
                if(!--pending)
                {
                  done(null, results);
                }
              }
            });
          });
        });
      };

      var done = this.async()

      walk('app/web', function(err, res)
      {

res=        _.map(res, function(v)
        {
          return v.replace('app/web/', '')
        })

        res = _.filter(res, function(v)
        {
          return v.indexOf(' ') === -1;

        })
        console.log(res.join("\n"))
        done()
      })

    })


};
