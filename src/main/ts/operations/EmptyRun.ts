import {Environment} from "../environment/Environment"
import {currentProject} from "../environment/ReadEnvironment"
import {ParsedShellParameters} from "../environment/ReadShellParameters"
import { listProjects } from "./ListProjects"

export function emptyProjectsRun(shellEnvironment: Environment, shellParameters: ParsedShellParameters) {
	var project = currentProject( shellParameters.internalRunMode )
	
	var projectName = project ? project : "<none>"
	
	// also list the available projects
	listProjects(shellEnvironment, shellParameters)
	shellEnvironment.log("Current " + shellParameters.internalRunMode + ": " + projectName)
}