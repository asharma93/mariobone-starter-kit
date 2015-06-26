/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/
define(function(require) {
    var MainLayout,
        Backbone = require("backbone"),
        _ = require("underscore"),
        /* jshint unused:false */
        Marionette = require("marionette"),
        template = require("hbs!templates/mariobone/layout/mainContent");

    MainLayout = Backbone.Marionette.LayoutView.extend({
        className: "main-content-layout",
        template : template,

        initialize : function() {
            this.addRegions({
                mainPanelRegion : "#nav-panel",
                workspaceRegion : "#workspace-panel",
                appSwitcherPanelRegion : "#app-switcher-panel"
            });
        }
    });

    return new MainLayout();
});