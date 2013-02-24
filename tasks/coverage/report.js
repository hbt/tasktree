module.exports = function(grunt)
{

  var _ = require('underscore')
  var fs = require('fs')
  var path = require('path')


  /**
   * reads coverage  json files created by the server with information sent from the browser after running the tests
   * uses the coverage.json to generate the coverage-report
   */
  grunt.registerTask('generate-report', 'generates coverage report', function()
  {
    var Report = require('istanbul').Report,
      Collector = new require('istanbul').Collector;

    // Note(hbt) add your own file-writer in report opts and pass it a callback if grunt starts interrupting this task
    var report = Report.create('html', {
      dir: path.resolve(process.cwd(), 'app/web/coverage-report')
    })


    var done = this.async()
    var collector = new Collector()
    var files = ['frontend', 'backend']


    // read json and append to collector
    _.each(files, function(file)
    {
      var filepath = path.resolve(process.cwd(), 'app/' + file + '-coverage.json')

      if(fs.existsSync(filepath))
      {
        var json = JSON.parse(fs.readFileSync(filepath, 'utf8'))
        collector.add(json)

        fs.unlinkSync(filepath)
      }
    })


    report.writeReport(collector, function()
    {
      done()
    })
  })

}