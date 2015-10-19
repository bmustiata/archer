var path = require("path");
/**
 * Returns the current project ID. This corresponds
 * to the YML file where the project is described.
 */
function currentProject(runMode) {
    var currentProject = process.env["CIPLOGIC_ARCHER_CURRENT_" + runMode.toUpperCase()];
    return currentProject;
}
exports.currentProject = currentProject;
/**
 * Returns the archer home.
 */
function archerHome(subPath) {
    var result;
    if (process.env.ARCHER_HOME) {
        result = process.env.ARCHER_HOME;
    }
    else {
        result = path.join(process.env.HOME, ".archer");
    }
    result = path.normalize(result);
    if (subPath) {
        return path.join(result, subPath);
    }
    else {
        return result;
    }
}
exports.archerHome = archerHome;
/**
 * Exports the chosen project work folder.
 */
function projectFolder(shellParameters) {
    return shellParameters.layout ?
        archerHome(shellParameters.internalRunMode + "s/layouts") :
        archerHome(shellParameters.internalRunMode + "s");
}
exports.projectFolder = projectFolder;
//# sourceMappingURL=ReadEnvironment.js.map