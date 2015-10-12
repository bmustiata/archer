/// <reference path="../../../../typings/node/node.d.ts"/>

import * as nomnom from "nomnom";
import {Environment} from "./Environment";
	
export interface ParsedShellParameters {
	new?: string
	edit?: boolean
	list?: boolean
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
}