/// <reference path="../../../typings/nomnom/nomnom.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../node_modules/core-promise/core-promise.d.ts"/>
/// <reference path="../../../node_modules/core-lang/core-lang.d.ts"/>

import { ShellEnvironment } from "./ShellEnvironment";
import nomnom = require("nomnom");
import fs = require("fs");

import {DefaultPromise as Promise} from "core-promise";
import {list} from "core-lang";

var shellEnvironment = new ShellEnvironment();

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
	}).printer((message, code?) => {
		shellEnvironment.log(message);
		process.exit(code);
	})
	.parse();

if (shellParameters.list) {
	listProjects(shellEnvironment);
}

function listProjects(shellEnvironment : ShellEnvironment) {
	readDir(process.env.HOME)
		.then(list)
		.then(list => list.mapPromise(fstat))
		.then(list => list.filterPromise((s : fs.Stats) => s))
}

function readDir(path: string) : Promise<Array<string>> {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {
			if (err) {
				reject(err);
			}
			
			resolve(files.map(f => path + "/" + f));
		})
	});
}

function fstat(path: string) : Promise<fs.Stats> {
	return new Promise((resolve, reject) => {
		fs.stat(path, (err, stats) => {
			if (err) {
				reject(err);
			}
			
			resolve(stats);
		});
	});
}