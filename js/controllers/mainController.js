/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/

define(function(require) {
    var Marionette = require("marionette"),
        utils = require("objects/eventUtilities"),
        MainLayout = require("layouts/mainLayout");

    function getRegion(name) {
        return utils.request("getAppRegion", name);
    }
    
    return Marionette.Controller.extend({
        onLogin : function() {
            //Login logic goes here
        },
        onHome : function() {
            var mainContentRegion = getRegion("mainContentRegion");
            mainContentRegion.show(MainLayout);
        },
    });
});
           
        