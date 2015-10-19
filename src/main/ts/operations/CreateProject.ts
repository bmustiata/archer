import * as path from "path"

import {Environment} from "../environment/Environment"
import {projectFolder} from "../environment/ReadEnvironment" 
import {ParsedShellParameters} from "../environment/ReadShellParameters" 

export function createNewProject(shellEnvironment : Environment, shellParameters: ParsedShellParameters) {
	var folder: string = projectFolder(shellParameters) 

	shellEnvironment.execute("mkdir -p " + folder);
	shellEnvironment.execute("$EDITOR " + path.join(folder, shellParameters.new + ".yml"));
}
