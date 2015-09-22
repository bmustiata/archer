/// <reference path="../../../typings/nomnom/nomnom.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../node_modules/core-promise/core-promise.d.ts"/>
/// <reference path="../../../node_modules/core-lang/core-lang.d.ts"/>
var ShellEnvironment_1 = require("./ShellEnvironment");
var nomnom = require("nomnom");
var fs = require("fs");
var core_promise_1 = require("core-promise");
var core_lang_1 = require("core-lang");
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
    listProjects(shellEnvironment);
}
function listProjects(shellEnvironment) {
    readDir(process.env.HOME)
        .then(core_lang_1.list)
        .then(function (list) { return list.mapPromise(fstat); })
        .then(function (list) { return list.filterPromise(function (s) { return s; }); });
}
function readDir(path) {
    return new core_promise_1.DefaultPromise(function (resolve, reject) {
        fs.readdir(path, function (err, files) {
            if (err) {
                reject(err);
            }
            resolve(files.map(function (f) { return path + "/" + f; }));
        });
    });
}
function fstat(path) {
    return new core_promise_1.DefaultPromise(function (resolve, reject) {
        fs.stat(path, function (err, stats) {
            if (err) {
                reject(err);
            }
            resolve(stats);
        });
    });
}
