(function() {
    module.exports = function(grunt) {
        "use strict";

        require("time-grunt")(grunt);
        require("load-grunt-tasks")(grunt, {
            pattern: ["grunt-*", "!grunt-template-jasmine-istanbul", "!grunt-template-jasmine-requirejs"]
        });

        grunt.initConfig({
            PATHS: {
                BUILD:  __dirname + "/dist/"
            },

            pkg: grunt.file.readJSON("package.json"),
            ARTIFACT_ZIP : "dist.zip",
            srcFiles: ["js/*.js", "js/**/*.js", "templates/**/*.js"],
            
            clean: ["<%=PATHS.BUILD%>"],

            jshint2: {
                options : {
                    jshintrc : ".jshintrc",
                    processor: "async",
                    spawnLimit: 50
                },
                files: ["Gruntfile.js", "<%= srcFiles %>"]
            },

            jscs: {
                src: "<%= srcFiles %>",
                options: {
                    config: ".jscsrc"
                }
            },

            bump: {
                options: {
                    files: ["bower.json", "package.json"],
                    commitMessage: "Release %VERSION%",
                    commitFiles: ["bower.json", "package.json"],
                    createTag: true,
                    tagName: "%VERSION%",
                    tagMessage: "Version %VERSION%",
                    pushTo: "origin master"
                }
            },

            connect : {
                server : {
                    options : {
                        hostname : "*",
                        port : 8000,
                        base : __dirname,
                        keepalive : true,

                        /* Added CORS configuration for Firefox to download webfonts */
                        middleware: function(connect, options) {
                            return [
                                function(req, res, next) {
                                    res.setHeader("Access-Control-Allow-Origin", "*");
                                    res.setHeader("Access-Control-Allow-Methods", "*");
                                    next();
                                },

                                connect.static(options.base[0])
                            ];
                        }
                    }
                }

            },

            compress: {
                main: {
                    options: {
                        archive: "<%=PATHS.BUILD%><%=ARTIFACT_ZIP%>"
                    },
                    files: [
                        {expand: true, src : ["dist/**/*", "bower.json"], dest : "<%= pkg.name %>-<%= pkg.version %>"}
                    ]
                }
            },

            requirejs: {
                compile: {
                    options: {
                        optimize : grunt.option("optimize") || "none",
                        preserveLicenseComments: false,
                        baseUrl : "js",
                        waitSeconds: 15,
                        generateSourceMaps: grunt.option("maps") || false,
                        uglify2 : {
                            output : {
                                "max_line_len" : 0
                            }
                        },

                        paths: {
                            "backbone"              : "empty:",
                            "bootstrap"             : "empty:",
                            "hbs"                   : "../bower_components/require-handlebars-plugin/hbs",
                            "i18n"                  : "empty:",
                            "jquery"                : "empty:",
                            "marionette"            : "empty:",
                            "marionette.subrouter"  : "empty:",
                            "moment"                : "empty:",
                            "underscore"            : "empty:",
                            "highcharts"            : "empty:",
                            "templates"             : "../templates",
                            "locales"               : "../locales"
                        },

                        hbs : {
                            templateExtension : "template"
                        },

                        shim: {
                            "bootstrap" : ["jquery"],
                            "highcharts" : {
                                deps : ["jquery"],
                                exports: "Highcharts"
                            }
                        },

                        deps: ["config"],

                        name: "ExampleApp",
                        
                        out: "<%= PATHS.BUILD %>js/<%= pkg.name %>.min.js"
                    }
                }
            },

            sass: {
                dist : {
                    options: {
                        includePaths: require("node-bourbon").includePaths,
                        outputStyle: "compressed"
                    },
                    files: {
                        "<%= PATHS.BUILD %>css/<%= pkg.name %>.min.css" : "css/main.scss"
                    }
                }
            },

            copy: {
                img: {
                    src: "img/*",
                    dest: "<%= PATHS.BUILD %>img",
                    expand: true,
                    flatten: true
                }
            },
            // Unit testing with jasmine
            jasmine: {
                test: {
                    src: "js/**/*.js",
                    options: {
                        keepRunner:true,
                        specs: "test/jasmine/spec/*.js",
                        template: require("grunt-template-jasmine-requirejs"),
                        templateOptions: {
                            requireConfigFile: __dirname + "/test/config.js",
                            requireConfig: {
                                baseUrl: "./js",
                            }
                        }
                    }
                }
            }

        });

        // Tasks
        grunt.registerTask("test", ["jshint2", "jscs"]);
        grunt.registerTask("compile", ["requirejs:compile", "sass:dist", "copy:img"]);
        grunt.registerTask("default", ["clean", "test", "compile", "compress"]);
        grunt.registerTask("server", ["connect"]);
    };
})();
