/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/

define(function(require) {
    var $ = require("jquery"),
        layoutTemplate = require("hbs!templates/mariobone/layout/initialContent"),
        _ = require("underscore"),
        Backbone = require("backbone"),
        Marionette = require("marionette"),
        MainRouter = require("routers/mainRouter"),
        ExampleApp = new Marionette.Application();

    // Setup request handlers
    function setChannels(app, channels) {
        var oldChannel = app.channel;

        //  Set the new channel
        _.extend(app, channels.app);
        app.channel = channels.app;

        //  Copy over any stuff that was on the old channel
        var oldHandlers = oldChannel.reqres._wreqrHandlers;
        _.each(_.keys(oldHandlers), function(handler) {
            app.channel.reqres.setHandler(handler, oldChannel.reqres.getHandler(handler));
        });
    }
    function setRequestHandlers(app) {
        app.channel.reqres.setHandler("getAppRegions", _.bind(function() {
            return this.getRegions();
        }, app));
        app.channel.reqres.setHandler("getAppRegion", _.bind(function(region) {
            return this[region]||null;
        }, app));
        app.channel.reqres.setHandler("getAppRegionNames", _.bind(function() {
            return this.regionsNames||[];
        }, app));
        app.channel.reqres.setHandler("getAppId", _.bind(function() {
            return this.appId||null;
        }, app));
    }
    var footerHeight = $("footer").innerHeight();
    function setMainPanelHeight() {
        var $mainPanel = $("#app-container").find(".main-panel"),
            mainPanelEl = $mainPanel[0],
            mainPanelOffsetTop = mainPanelEl.offsetTop,
            viewPortHeight = $(window).height(),
            panelHeight = viewPortHeight - mainPanelOffsetTop - footerHeight,
            minPanelHeight = 600;
        
        $mainPanel.height(panelHeight > minPanelHeight ? panelHeight : minPanelHeight);

    }

    // end of request handlers Setup
    ExampleApp.on("start", function(options) {
        options = options||{};

        this.el = options.el||"#app-container";

        //  Set up the channels
        this.channels = {
                global: Backbone.Wreqr.radio.channel("global"),
                app: options.channel||this.channel
            };
        setChannels(this, this.channels);
        setRequestHandlers(this);
        // end of: Set up the channels

        $(this.el).html(layoutTemplate());
        this.addRegions({
            userRegion: "#user-panel",
            mainContentRegion: "#main-content-panel"
        });
        this.regionsNames = _.keys(this.getRegions());

        setMainPanelHeight();
        $(window).on("resize", setMainPanelHeight);

        this.Router = this.Router || new MainRouter(options.routePrefix);
        this.Router.navigate(options.route || "home", {trigger: true});
        Backbone.Wreqr.radio.channel("active").vent.trigger("application:started", this);
    });
    
    return ExampleApp;
});
