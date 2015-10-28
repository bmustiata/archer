var ReadEnvironment_1 = require("../environment/ReadEnvironment");
var ListProjects_1 = require("./ListProjects");
function emptyProjectsRun(shellEnvironment, shellParameters) {
    var project = ReadEnvironment_1.currentProject(shellParameters.internalRunMode);
    var projectName = project ? project : "<none>";
    // also list the available projects
    ListProjects_1.listProjects(shellEnvironment, shellParameters);
    shellEnvironment.log("Current " + shellParameters.internalRunMode + ": " + projectName);
}
exports.emptyProjectsRun = emptyProjectsRun;
//# sourceMappingURL=EmptyRun.js.map