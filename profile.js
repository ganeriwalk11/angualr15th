System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Profile;
    return {
        setters:[],
        execute: function() {
            Profile = (function () {
                function Profile(profileName, cities) {
                    this.profileName = profileName;
                    this.cities = cities;
                }
                ;
                return Profile;
            }());
            exports_1("Profile", Profile);
        }
    }
});
//# sourceMappingURL=profile.js.map