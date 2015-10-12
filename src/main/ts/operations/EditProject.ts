import * as path from "path";

import {Environment} from "../environment/Environment"
import {ParsedShellParameters} from "../environment/ReadShellParameters"
import {archerHome, currentProject} from "../environment/ReadEnvironment"

export function editProject(shellEnvironment : Environment, shellParameters: ParsedShellParameters) {
	var projectsFolder: string = archerHome("projects"); 
	var targetProject : string = shellParameters._.length ? shellParameters._[0] : currentProject();

	shellEnvironment.execute("$EDITOR " + path.join(projectsFolder, targetProject + ".yml"));
}
