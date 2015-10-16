import * as path from "path"
import * as fs from "fs"

import {Environment} from "../environment/Environment"
import {archerHome, currentProject} from "../environment/ReadEnvironment"
import {readProjectYml} from "../storage/ProjectData"

/**
 * Select the given project.
 */
export function selectProject(shellEnvironment: Environment, params : Array<string>) {
	var projectName = params[0]
	var projectData = readProjectData(projectName)
	
	// 1. check if the project can be activated:
	var requiredEnvironmentVariables = projectData.requires || []
	var missingVariables = requiredEnvironmentVariables.filter(
		(v) => typeof process.env[v] == "undefined"
	)
	
	if (missingVariables.length > 0) {
		shellEnvironment.log("Unable to activate: " + projectName + "!");
		shellEnvironment.log("Missing environment variables: '" + missingVariables.join(", '") + "'.");
		
		return; // => bailing out
	}

	var oldProjectName = currentProject();
		
	if (oldProjectName == projectName) {
		shellEnvironment.log("The current project is already: " + projectName + ".");
		
		//return; // => bailing out
	}
	
	// 2. deactivate the previous project.
	if (oldProjectName) {
		var oldProject = readProjectData(oldProjectName)
		executeCommands(oldProject.deactivate, shellEnvironment)
		unsetCommands(projectData.commands, shellEnvironment)
		unsetVariables(oldProject.exports, shellEnvironment)
	}
	
	// 3. make the variable exports
	for (var export_name in projectData.exports) {
		shellEnvironment.setVariable(export_name, projectData.exports[export_name])
	}
	
	// 4. activate the current step
	executeCommands(projectData.activate, shellEnvironment)
	exportCommands(projectData.commands, shellEnvironment)	
	
	// 5. export the commands.
	shellEnvironment.log("Activated project: " + projectData.name)
	shellEnvironment.setVariable("CIPLOGIC_ARCHER_CURRENT_PROJECT", projectName)	
}

function exportCommands(commands: {[name:string] : string}, shellEnvironment: Environment) {
	for (var command in commands) {
		shellEnvironment.defineCommand(command, commands[command])
	}
}

function unsetCommands(commands: {[name:string] : string}, shellEnvironment: Environment) {
	for (var command in commands) {
		shellEnvironment.removeCommand(command)
	}
}

function unsetVariables(variables: {[name:string] : string}, shellEnvironment: Environment) {
	for (var variable in variables) {
		shellEnvironment.unsetVariable(variable)
	}
}

function executeCommands(commands: string, shellEnvironment: Environment) {
	if (commands) {
		commands.split(/\n/)
			.filter(command => command.trim() != "")
			.forEach(command => shellEnvironment.execute(command) )
	}
}

function readProjectData(projectName: string) {
	var projectsFolder: string = archerHome("projects")

	var projectFile = path.join(projectsFolder, projectName + ".yml")
	var fileData = fs.readFileSync(projectFile, 'utf-8')
	
	return readProjectYml(fileData)
}