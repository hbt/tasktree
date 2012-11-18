define([],function(){
    describe('Sanity checks', function(){
        it('server is running | to access remote database', function() {
            assert.ok(2 > 1);
        })

        it('remote database is running | to sync local data to remote database', function() {
            assert.ok(2 > 1);
        })

        it('browser supports web sockets | app requires instant two-way communication between local & remote', function() {
            assert.ok(2 > 1);
        })

    })
});

