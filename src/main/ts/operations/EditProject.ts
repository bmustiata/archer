import * as path from "path";

import {Environment} from "../environment/Environment"
import {ParsedShellParameters} from "../environment/ReadShellParameters"
import {projectFolder, currentProject} from "../environment/ReadEnvironment"

export function editProject(shellEnvironment : Environment, shellParameters: ParsedShellParameters) {
	var folders: string = projectFolder(shellParameters); 
	var targetProject : string = shellParameters._.length ? shellParameters._[0] : currentProject( shellParameters.internalRunMode );

	shellEnvironment.execute("$EDITOR " + path.join(folders, targetProject + ".yml"));
}
