var path = require("path");
var ReadEnvironment_1 = require("../environment/ReadEnvironment");
function createNewProject(shellEnvironment, shellParameters) {
    var folder = ReadEnvironment_1.projectFolder(shellParameters);
    shellEnvironment.execute("mkdir -p " + folder);
    shellEnvironment.execute("$EDITOR " + path.join(folder, shellParameters.new + ".yml"));
}
exports.createNewProject = createNewProject;
//# sourceMappingURL=CreateProject.js.map