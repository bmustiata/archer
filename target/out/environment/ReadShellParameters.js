/// <reference path="../../../../typings/node/node.d.ts"/>
/// <reference path="../../../../typings/nomnom/nomnom.d.ts"/>
var nomnom = require("nomnom");
/**
 * Parse the process parameters.
 */
function parseParameters(shellEnvironment) {
    return nomnom.script("project")
        .option("new", {
        abbr: "n",
        help: "Create a new project."
    })
        .option("edit", {
        abbr: "e",
        help: "Edit the given project, or the current project.",
        flag: true
    })
        .option("layout", {
        help: "Specify that we want to use the layouts.",
        flag: true
    })
        .option("internalRunMode", {
        help: "Specify the internal command that is used (e.g. project, server, etc)",
        required: true
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
}
exports.parseParameters = parseParameters;
//# sourceMappingURL=ReadShellParameters.js.map