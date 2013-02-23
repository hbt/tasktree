module.exports = function(grunt)
{

  var _ = require('underscore')
  var fs = require('fs')
  var path = require('path')

  // TODO(hbt) Refactor (low):
  // TODO(hbt) add desc
  grunt.registerTask('generate-report', 'instruments files +', function()
  {
    var Report = require('istanbul').Report,
      Collector = new require('istanbul').Collector;

    // Note(hbt) add your own file-writer in report opts and pass it a callback if grunt starts interrupting this task
    var report = Report.create('html', {
      dir: path.resolve(process.cwd(), 'app/web/coverage-report')
    })

    var done = this.async()

    // TODO(hbt) Refactor (low):
    // TODO(hbt) clean code

    var c = new Collector()

    // read json and append to collector
    var files = ['frontend', 'backend']
    _.each(files, function(file)
    {
      // TODO(hbt) Refactor (low):
      // TODO(hbt) use path resolve
      var filepath = __dirname + '/../../app/' + file + '-coverage.json'
      if(fs.existsSync(filepath))
      {
        var json = JSON.parse(fs.readFileSync(filepath, 'utf8'))
        c.add(json)

        fs.unlinkSync(filepath)
      }
    })

    report.writeReport(c, function()
    {
      done()
    })
  })

}