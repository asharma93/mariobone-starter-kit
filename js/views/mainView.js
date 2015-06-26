/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/
define(function(require) {
    var MainView,
        Backbone = require("backbone"),
        /* jshint unused:false */
        Marionette = require("marionette"),
        template = require("hbs!templates/mariobone/layout/mainContent");

    MainView = Backbone.Marionette.ItemView.extend({
        template : template,
        events : {
            "click .main-nav-item" : "onLogin"
        },
        onLogin : function() {
            console.log("You clicked the login tab");
        }
    });

    return MainView;
});