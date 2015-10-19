import {Environment} from "../environment/Environment"
import {currentProject} from "../environment/ReadEnvironment"
import {ParsedShellParameters} from "../environment/ReadShellParameters"

export function emptyProjectsRun(shellEnvironment: Environment, shellParameters: ParsedShellParameters) {
	var project = currentProject( shellParameters.internalRunMode )
	
	var projectName = project ? project : "<none>"
	
	shellEnvironment.log("Current " + shellParameters.internalRunMode + ": " + projectName)
}