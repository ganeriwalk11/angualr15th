System.register(['angular2/core', './profile.service', './weather-service', './weather'], function(exports_1, context_1) {
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
    var core_1, profile_service_1, weather_service_1, weather_1;
    var SidebarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (profile_service_1_1) {
                profile_service_1 = profile_service_1_1;
            },
            function (weather_service_1_1) {
                weather_service_1 = weather_service_1_1;
            },
            function (weather_1_1) {
                weather_1 = weather_1_1;
            }],
        execute: function() {
            SidebarComponent = (function () {
                function SidebarComponent(_profileservice, _weatherservice) {
                    this._profileservice = _profileservice;
                    this._weatherservice = _weatherservice;
                }
                SidebarComponent.prototype.onSaveNew = function () {
                    var cities = this._weatherservice.getWeatherItems().map(function (element) {
                        return element.cityName;
                    });
                    this._profileservice.saveNewProfile(cities);
                };
                SidebarComponent.prototype.onLoadProfile = function (profile) {
                    var me = this;
                    this._weatherservice.clearWeatherItems();
                    for (var i = 0; i < profile.cities.length; i++) {
                        me._weatherservice.searchWeatherData(profile.cities[i])
                            .retry()
                            .subscribe(function (data) {
                            var weatherItem = new weather_1.WeatherItem(data.name, data.weather[0].description, data.main.temp);
                            me._weatherservice.addWeatherItem(weatherItem);
                        });
                    }
                };
                SidebarComponent.prototype.onDeleteProfile = function (profile) {
                    this._profileservice.deleteProfile(profile);
                };
                SidebarComponent.prototype.ngOnInit = function () {
                    this.profiles = this._profileservice.getProfiles();
                };
                SidebarComponent = __decorate([
                    core_1.Component({
                        selector: 'my-sidebar',
                        template: "\n            <h3>Saved profiles</h3>\n            <button (click)=\"onSaveNew()\">Save List To Profiles</button>\n            <article class=\"profile\" *ngFor=\"#profile of profiles\" (click)=\"onLoadProfile(profile)\">\n                <h3>{{profile.profileName}}</h3>\n                <p>{{profile.cities.join(', ')}}</p>\n                <span class=\"delete\" (click)=\"onDeleteProfile($event,profile)\">X</span>\n            </article>\n    ",
                        providers: [profile_service_1.ProfileService],
                        styleUrls: ['app/style/sidebar-style.css']
                    }), 
                    __metadata('design:paramtypes', [profile_service_1.ProfileService, weather_service_1.WeatherService])
                ], SidebarComponent);
                return SidebarComponent;
            }());
            exports_1("SidebarComponent", SidebarComponent);
        }
    }
});
//# sourceMappingURL=sidebar.component.js.map