import {Environment} from "../environment/Environment"
import {currentProject} from "../environment/ReadEnvironment"

export function emptyProjectsRun(shellEnvironment: Environment) {
	var project = currentProject()
	
	var projectName = project ? project : "<none>"
	
	shellEnvironment.log("Current project: " + projectName)
}