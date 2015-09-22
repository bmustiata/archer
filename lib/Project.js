/// <reference path="../../../typings/nomnom/nomnom.d.ts"/>
var ShellEnvironment_1 = require("./ShellEnvironment");
var nomnom = require("nomnom");
var shellEnvironment = new ShellEnvironment_1.ShellEnvironment();
// parse the parameters from the string.
var shellParameters = nomnom.script("project")
    .option("new", {
    abbr: "n",
    help: "Create a new project."
})
    .option("edit", {
    abbr: "e",
    help: "Edit the current project."
})
    .option("list", {
    abbr: "l",
    help: "List the available projects.",
    flag: true
}).printer(function (message, code) {
    shellEnvironment.log(message);
    process.exit(code);
})
    .parse();
if (shellParameters.list) {
    shellEnvironment.log("Available projects:");
    shellEnvironment.execute("$EDITOR /etc/passwd");
}
