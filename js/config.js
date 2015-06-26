/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/

var VENDOR_PATH  = "../bower_components/";

require.config({
    baseUrl: window.CDN_BUCKET + "js",

    paths: {
        "backbone"              : VENDOR_PATH + "backbone/backbone",
        "bootstrap"             : VENDOR_PATH + "bootstrap/dist/js/bootstrap.min",
        "hbs"                   : VENDOR_PATH + "require-handlebars-plugin/hbs",
        "i18n"                  : VENDOR_PATH + "i18next/i18next.amd.min",
        "jquery"                : VENDOR_PATH + "jquery/dist/jquery.min",
        "marionette"            : VENDOR_PATH + "marionette/lib/backbone.marionette.min",
        "marionette.subrouter"  : VENDOR_PATH + "Marionette.SubRouter/backbone.marionette.subrouter.min",
        "moment"                : VENDOR_PATH + "moment/min/moment.min",
        "underscore"            : VENDOR_PATH + "lodash/dist/lodash.underscore.min",
        "highcharts"            : VENDOR_PATH + "highstock-release/highstock",
        "templates"             : "../templates"
    },

    shim: {
        "bootstrap" : ["jquery"],
        "highcharts" : {
            deps : ["jquery"],
            exports: "Highcharts"
        }
    },

    hbs: {
        templateExtension : "template"
    }
});