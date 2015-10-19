var fs = require("fs");
var path = require("path");
function readDir(folderPath) {
    return fs.readdirSync(folderPath)
        .map(function (it) {
        return {
            name: it,
            fullPath: path.join(folderPath, it)
        };
    });
}
exports.readDir = readDir;
function fstat(folderPath) {
    try {
        return fs.statSync(folderPath);
    }
    catch (e) {
        return null;
    }
}
exports.fstat = fstat;
//# sourceMappingURL=IO.js.map