/// <reference path="../../../../typings/js-yaml/js-yaml.d.ts"/>

import * as jsYaml from "js-yaml";

import {FileStat} from "./IO";

/**
 * Project data that is being read from the yml files.
 */
export interface ProjectData {
	/**
	 * The visual display name of the project.
	 */
	name : string
	
	/**
	 * The parent project where it inherits the activate/deactivate
	 * scripts, or requires, exports and commands.
	 */
	layouts : Array<string>
	
	/**
	 * Scripts to execute when the project is initially activated.
	 * The scripts are ordered from the existing layouts.
	 */
	activate : Array<string>
	
	/**
	 * Scripts to execute when the project is deactivated.
	 * The scripts are ordered from the existing layouts,
	 * in reverse order.
	 */
	deactivate : Array<string>

	/**
	 * Environment variables that are required to be present for this
	 * project to be activated.
	 */
	requires : Array<string>
	
	/**
	 * Define the variables that are exported by this project. These
	 * exports will be evaluated before the activate, and their values
	 * are evaluated as shell scritps. 
	 */
	exports : { [name :string] : string }
	
	/**
	 * Commands that are defined by this project.
	 */
	commands : { [name :string] : string }
}

/**
 * Reads the YML data for a given project.
 */
export function readProjectYml(data: string) : ProjectData {
	var loadedData = jsYaml.safeLoad(data)
	var project = loadedData.config || loadedData.layout
	
	ensureArray(project, "requires")
	ensureArray(project, "layouts")
	ensureArray(project, "activate")
	ensureArray(project, "deactivate")
	
	if (!project.exports) {
		project.exports = {}
	}
	if (!project.commands) {
		project.commands = {}
	}
	if (!project.name) {
		project.name = "<not defined>"
	}

	return project;
}

/**
 * Ensures the given value is an array.
 */
function ensureArray(obj: any, propertyName: string) : void {
	if (typeof obj[propertyName] == "string") {
		obj[propertyName] = [ obj[propertyName] ]
	}
	
	if (typeof obj[propertyName] == "undefined") {
		obj[propertyName] = [];
	}
}