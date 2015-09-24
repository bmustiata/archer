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
        .then(function (list) {
        list.map(function (it) {
            return {
                name: it,
                stat: fstat(it)
            };
        })
            .filter(function (s) { return s.stat && s.stat.isDirectory(); })
            .forEach(function (s) { return shellEnvironment.log(s.name); });
    })
        .catch(function (e) {
        shellEnvironment.log("ERROR:" + e.toString() + ':\n' + e.stack);
    });
}
function readDir(path) {
    return new core_promise_1.DefaultPromise(function (resolve, reject) {
        fs.readdir(path, function (err, files) {
            if (err) {
                reject(err);
            }
            resolve(core_lang_1.list(files).map(function (f) { return path + "/" + f; }));
        });
    });
}
function fstat(path) {
    try {
        return fs.statSync(path);
    }
    catch (e) {
        return null;
    }
}
