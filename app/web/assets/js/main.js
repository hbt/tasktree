require.config({
    baseUrl: 'assets/js'
});

require(['require', 'components/jquery/jquery', 'components/chai/chai', 'components/underscore/underscore', 'lib/utils'], function(require, $, chai) {
    require(['components/mocha/mocha'], function() {
        // Chai
        window.assert = chai.assert;

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
