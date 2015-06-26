/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/

define(function(require) {
    var EventUtils,
        /* jshint unused:false */
        Marionette = require("marionette"),
        Backbone = require("backbone"),
        _ = require("underscore");

    EventUtils = Backbone.Marionette.Object.extend({

        getActiveChannel : function() {
            return Backbone.Wreqr.radio.channel("active");
        },
        getGlobalChannel : function() {
            return Backbone.Wreqr.radio.channel("global");
        },
        //Each function below in context of the channel type:'active'

        //Initiates a trigger in the channel
        trigger : function(evt, args) {
            return this.getActiveChannel().vent.trigger(evt, args);
        },
        //Listens for an event
        listen : function(evt, args) {
            return this.getActiveChannel().vent.on(evt, args);
        },
        clearListeners : function() {
            return this.getActiveChannel().vent.off();
        },
        //Removes an event listener
        clearListenersFor : function(evt) {
            return this.getActiveChannel().vent.off(evt);
        },
        //Removes a function corresponding to an event
        clearListenerFor : function(evt, func) {
            return this.getActiveChannel().vent.off(evt, func);
        },
        //TODO: We should be using the active channel for the request function
        //      e.g. var func = this.getActiveChannel().reqres.request; 
        //Function to request a region 
        request : function() {
            // arguments passed when function is called. Arguments are assigned to 'args' as an array
            var args = _.toArray(arguments),
                func = this.getGlobalChannel().reqres.request; // assigns the main body of the function to 'func'
            return func.apply(this.getGlobalChannel().reqres, args); //returns the function with apply call
        }
    });

    // The following functions allow us to easily access either the 
    // global or active channel by defining them as properties of the utils object.
    // Usage example: Instead of calling "utils.getActiveChannel() or getGlobalChannel()...", we can now do:
    // "utils.active or utils.global..." to pass in which channel to use.
    var utils = new EventUtils();
    

    Object.defineProperty(utils, "active", {
        get: function() {
            return this.getActiveChannel();
        }
    });

    
    Object.defineProperty(utils, "global", {
        get: function() {
            return this.getGlobalChannel();
        }
    });

    return utils;

});
