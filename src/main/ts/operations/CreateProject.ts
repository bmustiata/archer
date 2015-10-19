import * as path from "path"

import {Environment} from "../environment/Environment"
import {archerHome} from "../environment/ReadEnvironment" 
import {ParsedShellParameters} from "../environment/ReadShellParameters" 

export function createNewProject(shellEnvironment : Environment, shellParameters: ParsedShellParameters) {
	var projectsFolder: string = shellParameters.layout ? 
			archerHome(shellParameters.internalRunMode + "s/layouts") : 
			archerHome(shellParameters.internalRunMode + "s") 

	shellEnvironment.execute("mkdir -p " + path.normalize(projectsFolder));
	shellEnvironment.execute("$EDITOR " + path.join(projectsFolder, shellParameters.new + ".yml"));
}
