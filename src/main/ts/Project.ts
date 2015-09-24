/// <reference path="../../../typings/nomnom/nomnom.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../node_modules/core-promise/core-promise.d.ts"/>
/// <reference path="../../../node_modules/core-lang/core-lang.d.ts"/>

import { ShellEnvironment } from "./ShellEnvironment";
import nomnom = require("nomnom");
import fs = require("fs");

import {DefaultPromise as Promise} from "core-promise";
import {list, XList} from "core-lang";

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
		.then(list => { 
			list.map((it) => {
					return {
						name : it,
						stat : fstat(it)
					};
				})
				.filter(s => s.stat && s.stat.isDirectory())
				.forEach(s => shellEnvironment.log(s.name))
		})
		.catch(e => {
			shellEnvironment.log("ERROR:" + e.toString() + ':\n' + e.stack);
		});
}

function readDir(path: string) : Promise<XList<string>> {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {
			if (err) {
				reject(err);
			}
			
			resolve(list(files).map(f => path + "/" + f));
		})
	});
}

function fstat(path: string) : fs.Stats {
	try {
		return fs.statSync(path);
	} catch(e) {
		return null;
	}
}