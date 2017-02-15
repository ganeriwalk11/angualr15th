System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var video;
    return {
        setters:[],
        execute: function() {
            video = (function () {
                function video(id, title, videoCode, desc) {
                    this.id = id;
                    this.title = title;
                    this.videoCode = videoCode;
                    this.desc = desc;
                }
                return video;
            }());
            exports_1("video", video);
        }
    }
});
//# sourceMappingURL=video.js.map