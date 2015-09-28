/// <reference path="../../../typings/nomnom/nomnom.d.ts"/>
/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../node_modules/core-promise/core-promise.d.ts"/>
/// <reference path="../../../node_modules/core-lang/core-lang.d.ts"/>

import { ShellEnvironment } from "./ShellEnvironment";
import nomnom = require("nomnom");
import fs = require("fs");

import {DefaultPromise as Promise} from "core-promise";
import {list, XList} from "core-lang";
import * as path from "path";
import * as jsYaml from "js-yaml";

interface Project {
	name: string,
	file: FileName;
}

var shellEnvironment = new ShellEnvironment();

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
	}).printer((message, code?) => {
		shellEnvironment.log(message);
		shellEnvironment.flush();
		process.exit(code);
	})
	.parse();

interface FileName {
	name: string
	fullPath: string
}

interface FileStat {
	file: FileName
	stat: fs.Stats
}

shellEnvironment.defineCommand("cls", "clear\necho \"wut $@\"");

if (shellParameters.list) {
	listProjects(shellEnvironment);
} else if (shellParameters["new"]) {
	createNewProject(shellEnvironment, shellParameters);
} else if (shellParameters["edit"]) {
	editProject(shellEnvironment, shellParameters);
} else { // project selection or empty run.
	if (!shellParameters._.length) {
		emptyProjectsRun(shellEnvironment);
	} else {
		selectProject(shellEnvironment, shellParameters._);
	}
}

shellEnvironment.flush();

function createNewProject(shellEnvironment : ShellEnvironment, shellParameters) {
	var projectsFolder: string = archerHome("projects"); 

	shellEnvironment.execute("mkdir -p " + path.normalize(projectsFolder));
	shellEnvironment.execute("$EDITOR " + path.join(projectsFolder, shellParameters.new + ".yml"));
}

function editProject(shellEnvironment : ShellEnvironment, shellParameters) {
	var projectsFolder: string = archerHome("projects"); 
	var targetProject : string = shellParameters._.length ? shellParameters._[0] : currentProject();

	shellEnvironment.execute("$EDITOR " + path.join(projectsFolder, targetProject + ".yml"));
}

function currentProject() {
	return "test";
}

function listProjects(shellEnvironment : ShellEnvironment) {
	var projectsFolder: string = archerHome("projects"); 
	
	try {
		shellEnvironment.execute("mkdir -p " + path.normalize(projectsFolder));
		readDir(projectsFolder)
			.map((it) => {
				return <FileStat> {
					file: it,
					stat : fstat(it.fullPath)
				};
			})
			.filter(it => it.stat && it.stat.isFile())
			//.map(readProjectYml)
			.forEach(it => shellEnvironment.log(it.file.name))
	} catch(e) {
		shellEnvironment.log("ERROR: " + e.toString() + ':\n' + e.stack);
		shellEnvironment.log("ERROR: Unable to read projects from: " + projectsFolder);
	}
}

function readProjectYml(it: FileStat) : Project {
	return jsYaml.safeLoad(it.file.fullPath);
}

function emptyProjectsRun(shellEnvironment: ShellEnvironment) {
	shellEnvironment.log("empty projects run");
}

function selectProject(shellEnvironment: ShellEnvironment, params : Array<string>) {
	shellEnvironment.log("select project: " + params);
}

function readDir(folderPath: string) : Array<FileName> {
	return fs.readdirSync(folderPath)
		.map(it => { 
			return {
				name: it,
				fullPath : path.join(folderPath, it)
			}
		});
}

function fstat(folderPath: string) : fs.Stats {
	try {
		return fs.statSync(folderPath);
	} catch(e) {
		return null;
	}
}

/**
 * Returns the archer home.
 */
function archerHome(subPath?: string) : string {
	var result : string;
	
	if (process.env.ARCHER_HOME) {
		result = process.env.ARCHER_HOME;
	} else {
		result = path.join(process.env.HOME, ".archer");
	}
	
	result = path.normalize(result);
	
	if (subPath) {
		return path.join(result, subPath);
	} else {
		return result;
	}
}
