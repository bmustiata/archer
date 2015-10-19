var path = require("path");
var ReadEnvironment_1 = require("../environment/ReadEnvironment");
function editProject(shellEnvironment, shellParameters) {
    var folders = ReadEnvironment_1.projectFolder(shellParameters);
    var targetProject = shellParameters._.length ? shellParameters._[0] : ReadEnvironment_1.currentProject(shellParameters.internalRunMode);
    shellEnvironment.execute("$EDITOR " + path.join(folders, targetProject + ".yml"));
}
exports.editProject = editProject;
//# sourceMappingURL=EditProject.js.map