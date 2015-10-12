import * as path from "path";

export function currentProject() {
	return "test";
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
