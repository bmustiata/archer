import * as path from "path"
import {ParsedShellParameters} from "./ReadShellParameters"

/**
 * Returns the current project ID. This corresponds
 * to the YML file where the project is described.
 */
export function currentProject(runMode: string) : string {
	var currentProject = process.env["CIPLOGIC_ARCHER_CURRENT_" + runMode.toUpperCase()];
	
	return currentProject;
}

/**
 * Returns the archer home.
 */
export function archerHome(subPath?: string) : string {
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

/**
 * Exports the chosen project work folder.
 */
export function projectFolder(shellParameters: ParsedShellParameters) : string {
	return shellParameters.layout ?
			archerHome(shellParameters.internalRunMode + "s/layouts") : 
			archerHome(shellParameters.internalRunMode + "s") 
}
