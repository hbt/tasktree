require.config({
    baseUrl: 'assets/js/'
});

require(['require', 'vendor/mocha/chai', 'vendor/underscore', 'lib/utils'], function(require, chai) {
    require(['vendor/mocha/mocha'], function() {
        // Chai
        window.assert = chai.assert;
//        should = chai.should();
//        expect = chai.expect;

        // Mocha
        mocha.setup({
            ignoreLeaks: true,
            ui: 'bdd'
        })

        require(['test/sanity'], function() {
            mocha.run();
        });
    })
})
