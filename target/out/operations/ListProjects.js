var fs = require("fs");
var ReadEnvironment_1 = require("../environment/ReadEnvironment");
var IO_1 = require("../storage/IO");
var ProjectData_1 = require("../storage/ProjectData");
function listProjects(shellEnvironment, shellParameters) {
    var folder = ReadEnvironment_1.projectFolder(shellParameters);
    try {
        IO_1.readDir(folder)
            .map(function (it) {
            return {
                file: it,
                stat: IO_1.fstat(it.fullPath)
            };
        })
            .filter(function (it) { return it.stat && it.stat.isFile(); })
            .map(function (it) {
            var fileData = fs.readFileSync(it.file.fullPath, 'utf-8');
            var projectData = ProjectData_1.readProjectYml(fileData);
            return {
                fileName: it.file.name,
                projectName: projectData.name
            };
        })
            .forEach(function (it) { return shellEnvironment.log(it.fileName + ": " + it.projectName); });
    }
    catch (e) {
        shellEnvironment.log("ERROR: " + e.toString() + ':\n' + e.stack);
        shellEnvironment.log("ERROR: Unable to read projects from: " + folder);
    }
}
exports.listProjects = listProjects;
//# sourceMappingURL=ListProjects.js.map