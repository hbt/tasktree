define([], function() {
    describe('Sanity checks', function() {
        describe('Server', function() {
            it('server is running | to access remote database', function(done) {
                // TODO(hbt) fix url
                $.ajax({
                    url: 'http://localhost:3000',
                    context: document.body,
                    success: function() {
                        done()
                    }
                });
            })

            xit('server can recover from crashes | uses forever', function() {})
        })

        xit('remote database is running | to sync local data to remote database', function() {
            assert.ok(2 > 1);
        })

        xit('browser supports web sockets | app requires instant two-way communication between local & remote', function() {
            assert.ok(2 > 1);
        })

    })
});
