/// <reference path="../../../../typings/node/node.d.ts"/>
/// <reference path="../../../../typings/nomnom/nomnom.d.ts"/>

import * as nomnom from "nomnom";
import {Environment} from "./Environment";
	
export interface ParsedShellParameters {
	new?: string
	edit?: boolean
	list?: boolean
	layout?: boolean
	internalRunMode: string
	_: Array<string>
}

/**
 * Parse the process parameters.
 */
export function parseParameters(shellEnvironment: Environment) : ParsedShellParameters {
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
			abbr: "l",
			help: "Specify that we want to use the layouts.",
			flag: true
		})
		.option("internalRunMode", {
			help: "Specify the internal command that is used (e.g. project, server, etc)",
			required: true
		})
		.option("list", {
			help: "List the available projects.",
			flag: true
		}).printer((message, code?) => {
			shellEnvironment.log(message);
			shellEnvironment.flush();
			process.exit(code);
		})
		.parse();
}