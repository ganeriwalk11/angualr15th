System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WeatherItem;
    return {
        setters:[],
        execute: function() {
            WeatherItem = (function () {
                function WeatherItem(cityName, description, temperature) {
                    this.cityName = cityName;
                    this.description = description;
                    this.temperature = temperature;
                }
                return WeatherItem;
            }());
            exports_1("WeatherItem", WeatherItem);
        }
    }
});
//# sourceMappingURL=weather.js.map