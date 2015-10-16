import * as path from "path";

/**
 * Returns the current project ID. This corresponds
 * to the YML file where the project is described.
 */
export function currentProject() : string {
	var currentProject = process.env.CIPLOGIC_ARCHER_CURRENT_PROJECT;
	
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
