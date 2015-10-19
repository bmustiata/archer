var path = require("path");
var ReadEnvironment_1 = require("../environment/ReadEnvironment");
var IO_1 = require("../storage/IO");
function listProjects(shellEnvironment, shellParameters) {
    var folder = ReadEnvironment_1.projectFolder(shellParameters);
    try {
        shellEnvironment.execute("mkdir -p " + path.normalize(folder));
        IO_1.readDir(folder)
            .map(function (it) {
            return {
                file: it,
                stat: IO_1.fstat(it.fullPath)
            };
        })
            .filter(function (it) { return it.stat && it.stat.isFile(); })
            .forEach(function (it) { return shellEnvironment.log(it.file.name); });
    }
    catch (e) {
        shellEnvironment.log("ERROR: " + e.toString() + ':\n' + e.stack);
        shellEnvironment.log("ERROR: Unable to read projects from: " + folder);
    }
}
exports.listProjects = listProjects;
//# sourceMappingURL=ListProjects.js.map