/// <reference path="../../../typings/nomnom/nomnom.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../node_modules/core-promise/core-promise.d.ts"/>
/// <reference path="../../../node_modules/core-lang/core-lang.d.ts"/>
var ShellEnvironment_1 = require("./ShellEnvironment");
var nomnom = require("nomnom");
var fs = require("fs");
var path = require("path");
var jsYaml = require("js-yaml");
var shellEnvironment = new ShellEnvironment_1.ShellEnvironment();
// parse the parameters from the string.
var shellParameters = nomnom.script("project")
    .option("new", {
    abbr: "n",
    help: "Create a new project."
})
    .option("edit", {
    abbr: "e",
    help: "Edit the given project, or the current project.",
    flag: true
})
    .option("list", {
    abbr: "l",
    help: "List the available projects.",
    flag: true
}).printer(function (message, code) {
    shellEnvironment.log(message);
    shellEnvironment.flush();
    process.exit(code);
})
    .parse();
shellEnvironment.defineCommand("cls", "clear\necho \"wut $@\"");
if (shellParameters.list) {
    listProjects(shellEnvironment);
}
else if (shellParameters["new"]) {
    createNewProject(shellEnvironment, shellParameters);
}
else if (shellParameters["edit"]) {
    editProject(shellEnvironment, shellParameters);
}
else {
    if (!shellParameters._.length) {
        emptyProjectsRun(shellEnvironment);
    }
    else {
        selectProject(shellEnvironment, shellParameters._);
    }
}
shellEnvironment.flush();
function createNewProject(shellEnvironment, shellParameters) {
    var projectsFolder = archerHome("projects");
    shellEnvironment.execute("mkdir -p " + path.normalize(projectsFolder));
    shellEnvironment.execute("$EDITOR " + path.join(projectsFolder, shellParameters.new + ".yml"));
}
function editProject(shellEnvironment, shellParameters) {
    var projectsFolder = archerHome("projects");
    var targetProject = shellParameters._.length ? shellParameters._[0] : currentProject();
    shellEnvironment.execute("$EDITOR " + path.join(projectsFolder, targetProject + ".yml"));
}
function currentProject() {
    return "test";
}
function listProjects(shellEnvironment) {
    var projectsFolder = archerHome("projects");
    try {
        shellEnvironment.execute("mkdir -p " + path.normalize(projectsFolder));
        readDir(projectsFolder)
            .map(function (it) {
            return {
                file: it,
                stat: fstat(it.fullPath)
            };
        })
            .filter(function (it) { return it.stat && it.stat.isFile(); })
            .forEach(function (it) { return shellEnvironment.log(it.file.name); });
    }
    catch (e) {
        shellEnvironment.log("ERROR: " + e.toString() + ':\n' + e.stack);
        shellEnvironment.log("ERROR: Unable to read projects from: " + projectsFolder);
    }
}
function readProjectYml(it) {
    return jsYaml.safeLoad(it.file.fullPath);
}
function emptyProjectsRun(shellEnvironment) {
    shellEnvironment.log("empty projects run");
}
function selectProject(shellEnvironment, params) {
    shellEnvironment.log("select project: " + params);
}
function readDir(folderPath) {
    return fs.readdirSync(folderPath)
        .map(function (it) {
        return {
            name: it,
            fullPath: path.join(folderPath, it)
        };
    });
}
function fstat(folderPath) {
    try {
        return fs.statSync(folderPath);
    }
    catch (e) {
        return null;
    }
}
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
//# sourceMappingURL=Project.js.map