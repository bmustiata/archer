import * as jsYaml from "js-yaml";

import {FileStat} from "./IO";

/**
 * Project data that is being read from the yml files.
 */
interface ProjectData {
	/**
	 * The visual display name of the project.
	 */
	name? : string
	
	/**
	 * The parent project where it inherits the activate/deactivate
	 * scripts, or requires, exports and commands.
	 */
	layout? : string
	
	/**
	 * Script to execute when the project is initially activated.
	 */
	activate? : string
	
	/**
	 * Script to execute when the project is deactivated.
	 */
	deactivate? : string

	/**
	 * Environment variables that are required to be present for this
	 * project to be activated.
	 */
	requires? : Array<string>
	
	/**
	 * Define the variables that are exported by this project. These
	 * exports will be evaluated before the activate, and their values
	 * are evaluated as shell scritps. 
	 */
	export? : { [name :string] : string }
	
	/**
	 * Commands that are defined by this project.
	 */
	commands? : { [name :string] : string }
}

export function readProjectYml(data: string) : ProjectData {
	var project = jsYaml.safeLoad(data).project;
	
	if (typeof project.requires == "string") {
		project.requires = [ project.requires ]
	}
	
	return project;
}
