/**
 * Created by indika on 8/5/15.
 */
require.config({
    baseUrl: 'js',
    paths: {
        'flightConfig'  : 'helper/flight_config',
        'jQuery'        : 'vendor/jquery-2.1.4.min',
        'bootstrap'     : 'vendor/bootstrap.min',
        'jQueryUI'        : 'vendor/jquery-ui.min',
        'prgUI'         : 'helper/pgui_1.0',
        'xhr'         : 'helper/xhrService',
        'signals'         : 'helper/signals',
        'crossroads'         : 'helper/crossroads'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'bootstrap': {
            deps : ["jQuery"],
            exports: 'bootstrap'
        },
        'jQueryUI': {
            deps : ["jQuery"],
            exports: 'jQueryUI'
        },
        'prgUI' : {
            deps : ["jQuery"],
            exports: 'gUI'

        },
        'flightConfig': {
            //deps : ["jquery"],
            exports: 'flConfig'
        },
        'xhr': {
            deps : ["jQuery"],
            exports: 'xhr'
        },
    }

});
