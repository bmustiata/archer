var path = require("path");
var fs = require("fs");
var ReadEnvironment_1 = require("../environment/ReadEnvironment");
var ProjectData_1 = require("../storage/ProjectData");
/**
 * Select the given project.
 */
function selectProject(shellEnvironment, shellParameters) {
    var projectName = shellParameters._[0];
    var projectData = readProjectData(projectName, shellParameters.internalRunMode);
    // 1. check if the project can be activated:
    var requiredEnvironmentVariables = projectData.requires || [];
    var missingVariables = requiredEnvironmentVariables.filter(function (v) { return typeof process.env[v] == "undefined" &&
        !projectData.exports[v]; });
    if (missingVariables.length > 0) {
        shellEnvironment.log("Unable to activate: " + projectName + "!");
        shellEnvironment.log("Missing environment variables: '" + missingVariables.join(", '") + "'.");
        return; // => bailing out
    }
    var oldProjectName = ReadEnvironment_1.currentProject(shellParameters.internalRunMode);
    if (oldProjectName == projectName) {
        shellEnvironment.log("The current " + shellParameters.internalRunMode + " is already: " + projectName + ".");
    }
    // 2. deactivate the previous project.
    if (oldProjectName) {
        var oldProject = readProjectData(oldProjectName, shellParameters.internalRunMode);
        executeCommands(oldProject.deactivate, shellEnvironment);
        unsetCommands(oldProject.commands, shellEnvironment);
        unsetVariables(oldProject.exports, shellEnvironment);
    }
    // 3. make the variable exports
    for (var export_name in projectData.exports) {
        shellEnvironment.setVariable(export_name, projectData.exports[export_name]);
    }
    // 4. activate the current step
    executeCommands(projectData.activate, shellEnvironment);
    exportCommands(projectData.commands, shellEnvironment);
    // 5. export the commands.
    shellEnvironment.log("Activated " + shellParameters.internalRunMode + ": " + projectData.name);
    shellEnvironment.setVariable("CIPLOGIC_ARCHER_CURRENT_" + shellParameters.internalRunMode.toUpperCase(), projectName);
}
exports.selectProject = selectProject;
function exportCommands(commands, shellEnvironment) {
    shellEnvironment.log("Commands: ");
    for (var command in commands) {
        shellEnvironment.log("   " + command);
        shellEnvironment.defineCommand(command, commands[command]);
    }
}
function unsetCommands(commands, shellEnvironment) {
    for (var command in commands) {
        shellEnvironment.removeCommand(command);
    }
}
function unsetVariables(variables, shellEnvironment) {
    for (var variable in variables) {
        shellEnvironment.unsetVariable(variable);
    }
}
function executeCommands(commands, shellEnvironment) {
    if (commands) {
        commands.join("\n") // merge all the scripts
            .split(/\n/)
            .filter(function (command) { return command.trim() != ""; })
            .forEach(function (command) { return shellEnvironment.execute(command); });
    }
}
/**
 * Read the project data for the given file, including the layouts.
 */
function readProjectData(projectName, internalRunMode, projectsFolder) {
    projectsFolder = projectsFolder ? projectsFolder : ReadEnvironment_1.archerHome(internalRunMode + "s");
    var projectFile = path.join(projectsFolder, projectName + ".yml");
    var fileData = fs.readFileSync(projectFile, 'utf-8');
    var result = {
        name: "<none>",
        layouts: [],
        requires: [],
        activate: [],
        deactivate: [],
        commands: {},
        exports: {}
    };
    var projectData = ProjectData_1.readProjectYml(fileData);
    projectData.layouts.forEach(function (layout, index) {
        var layoutData = readProjectData(layout, internalRunMode, ReadEnvironment_1.archerHome(internalRunMode + "s/layouts"));
        mix(result, layoutData);
    });
    result.layouts = projectData.layouts;
    result.name = projectData.name;
    return mix(result, projectData);
}
/**
 * Mix in the requires, activate and deactivate scripts and commands and exports.
 */
function mix(source, extra) {
    (_a = source.requires).push.apply(_a, extra.requires);
    (_b = source.deactivate).splice.apply(_b, [0, 0].concat(extra.deactivate));
    (_c = source.activate).push.apply(_c, extra.activate);
    for (var k in extra.commands) {
        source.commands[k] = extra.commands[k];
    }
    for (var k in extra.exports) {
        source.exports[k] = extra.exports[k];
    }
    return source;
    var _a, _b, _c;
}
//# sourceMappingURL=SelectProject.js.map