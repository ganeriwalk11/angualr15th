System.register(['angular2/core', './weather-service', './weather', 'rxjs/Subject', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, weather_service_1, weather_1, Subject_1;
    var WeatherSearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (weather_service_1_1) {
                weather_service_1 = weather_service_1_1;
            },
            function (weather_1_1) {
                weather_1 = weather_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (_1) {}],
        execute: function() {
            WeatherSearchComponent = (function () {
                function WeatherSearchComponent(_weatherservice) {
                    this._weatherservice = _weatherservice;
                    this.searchStream = new Subject_1.Subject();
                    this.data = {};
                }
                WeatherSearchComponent.prototype.onSubmit = function (form) {
                    var me = this;
                    me._weatherservice.searchWeatherData(form.value.location)
                        .subscribe(function (data) {
                        var weatherItem = new weather_1.WeatherItem(data.name, data.weather[0].description, data.main.temp);
                        me._weatherservice.addWeatherItem(weatherItem);
                    }, function (err) {
                        console.log(err);
                    }, function () {
                        console.log("Completed");
                    });
                };
                WeatherSearchComponent.prototype.onSearchLocation = function (cityName) {
                    console.log(this);
                    this.searchStream
                        .next(cityName);
                };
                WeatherSearchComponent.prototype.clearTheList = function () {
                    this._weatherservice.clearWeatherItems();
                };
                WeatherSearchComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log(this);
                    this.searchStream
                        .debounceTime(500)
                        .distinctUntilChanged()
                        .switchMap(function (da) {
                        return _this._weatherservice.searchWeatherData(da);
                    })
                        .subscribe(function (data) { this.data = data; console.log(this.data.name); });
                };
                WeatherSearchComponent = __decorate([
                    core_1.Component({
                        selector: 'my-weather-search',
                        template: "\n        <section class=\"weather-search\">\n            <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\" >\n                <label for=\"city\">City</label>\n                <input type=\"text\" ngControl=\"location\" id=\"city\" (keyup)=\"onSearchLocation(input.value)\" placeholder=\"Enter City Name\" required #input>\n                <button type=\"submit\">Add City</button>\n            </form>\n            <div>\n            <span class=\"info\">City Found:{{data.name | async}}</span>\n            </div>\n             <div>\n                <button (click)=\"clearTheList()\">Clear:</button>\n            </div>\n        </section>\n    ",
                    }), 
                    __metadata('design:paramtypes', [weather_service_1.WeatherService])
                ], WeatherSearchComponent);
                return WeatherSearchComponent;
            }());
            exports_1("WeatherSearchComponent", WeatherSearchComponent);
        }
    }
});
//# sourceMappingURL=weather-search-component.js.map