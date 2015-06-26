/************************************************************************
*   MarioBone - A Backbone.Marionette example application.              *
*               Boilerplate to get started.                Amit Sharma  *
************************************************************************/

define(function(require) {
    var Backbone = require("backbone"),
        _ = require("underscore");

    return Backbone.Model.extend({
        urlRoot : "api/example",
        defaults: function() {
            var luckOffset = _.random(0, 5),
                valueOffset = _.random(0, 50);
            return {
                data: [
                    // Fallback data
                    {
                        "value":20,
                        "date":1417392000,
                        "luck":1 + luckOffset
                    },
                    {
                        "value":5 + valueOffset,
                        "date":1393632000,
                        "luck":1 + luckOffset
                    },
                    {
                        "value":51 + valueOffset,
                        "date":1390498460,
                        "luck":2 + luckOffset
                    },
                    {
                        "value":98 + valueOffset,
                        "date":1396310400,
                        "luck":3 + luckOffset
                    },
                    {
                        "value":76 + valueOffset,
                        "date":1398902400,
                        "luck":3 + luckOffset
                    },
                    {
                        "value":39 + valueOffset,
                        "date":1401580800,
                        "luck":2 + luckOffset
                    },
                    {
                        "value":62 + valueOffset,
                        "date":1404172800,
                        "luck":3 + luckOffset
                    },
                    {
                        "value":27 + valueOffset,
                        "date":1394006460,
                        "luck":2 + luckOffset
                    },
                    {
                        "value":22 + valueOffset,
                        "date":1389539172,
                        "luck":2 + luckOffset
                    },
                    {
                        "value":16 + valueOffset,
                        "date":1412121600,
                        "luck":1 + luckOffset
                    },
                    {
                        "value":9 + valueOffset,
                        "date":1414800000,
                        "luck":1 + luckOffset
                    },
                    {
                        "value":5 + valueOffset,
                        "date":1391212800,
                        "luck":1 + luckOffset
                    }
                ]
            };
        }
    });
});