const path = require('path');

module.exports = function getContentType(url) {
    switch (path.extname(url)) {
        case ".thml":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        case ".svg":
            return "image/svg+xml";
        default:
            return "application/octate-stream";
    }
}