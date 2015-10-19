var ReadEnvironment_1 = require("../environment/ReadEnvironment");
function emptyProjectsRun(shellEnvironment, shellParameters) {
    var project = ReadEnvironment_1.currentProject(shellParameters.internalRunMode);
    var projectName = project ? project : "<none>";
    shellEnvironment.log("Current " + shellParameters.internalRunMode + ": " + projectName);
}
exports.emptyProjectsRun = emptyProjectsRun;
//# sourceMappingURL=EmptyRun.js.map