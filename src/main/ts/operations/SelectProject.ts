import * as path from "path"
import * as fs from "fs"

import {Environment} from "../environment/Environment"
import {archerHome, currentProject} from "../environment/ReadEnvironment"
import {readProjectYml, ProjectData} from "../storage/ProjectData"
import {ParsedShellParameters} from "../environment/ReadShellParameters"

/**
 * Select the given project.
 */
export function selectProject(shellEnvironment: Environment, shellParameters: ParsedShellParameters) {
	var projectName = shellParameters._[0]
	var projectData = readProjectData(projectName, shellParameters.internalRunMode)
	
	// 1. check if the project can be activated:
	var requiredEnvironmentVariables = projectData.requires || []
	var missingVariables = requiredEnvironmentVariables.filter(
		(v) => typeof process.env[v] == "undefined" &&
			   !projectData.exports[v]
	)
	
	if (missingVariables.length > 0) {
		shellEnvironment.log("Unable to activate: " + projectName + "!");
		shellEnvironment.log("Missing environment variables: '" + missingVariables.join(", '") + "'.");
		
		return; // => bailing out
	}

	var oldProjectName = currentProject(shellParameters.internalRunMode);
		
	if (oldProjectName == projectName) {
		shellEnvironment.log("The current " + shellParameters.internalRunMode + " is already: " + projectName + ".");
		
		//return; // => bailing out
	}
	
	// 2. deactivate the previous project.
	if (oldProjectName) {
		var oldProject = readProjectData(oldProjectName, shellParameters.internalRunMode)
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
	shellEnvironment.log("Activated "+ shellParameters.internalRunMode + ": " + projectData.name)
	shellEnvironment.setVariable("CIPLOGIC_ARCHER_CURRENT_" + shellParameters.internalRunMode.toUpperCase(), projectName)	
}

function exportCommands(commands: {[name:string] : string}, shellEnvironment: Environment) {
	shellEnvironment.log("Commands: ");
	
	for (var command in commands) {
		shellEnvironment.log("   " + command);
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

function executeCommands(commands: Array<string>, shellEnvironment: Environment) {
	if (commands) {
		commands.join("\n") // merge all the scripts
			.split(/\n/)
			.filter(command => command.trim() != "")
			.forEach(command => shellEnvironment.execute(command) )
	}
}

/**
 * Read the project data for the given file, including the layouts.
 */
function readProjectData(projectName: string, internalRunMode: string, projectsFolder? : string) : ProjectData {
	projectsFolder = projectsFolder ? projectsFolder : archerHome(internalRunMode + "s")

	var projectFile = path.join(projectsFolder, projectName + ".yml")
	var fileData = fs.readFileSync(projectFile, 'utf-8')
	
	var result : ProjectData = {
		name: "<none>",
		layouts: [],
		requires: [],
		activate: [],
		deactivate: [],
		commands: {},
		exports: {}
	};
	var projectData = readProjectYml(fileData)
	
	projectData.layouts.forEach((layout, index) => {
		var layoutData = readProjectData(layout, internalRunMode, archerHome(internalRunMode + "s/layouts"))
		mix(result, layoutData)
	});
	
	result.layouts = projectData.layouts
	result.name = projectData.name
	
	return mix(result, projectData)
}

/**
 * Mix in the requires, activate and deactivate scripts and commands and exports.
 */
function mix(source : ProjectData, extra : ProjectData) : ProjectData {
	source.requires.push(...extra.requires)
	source.deactivate.splice(0, 0, ...extra.deactivate)
	source.activate.push(...extra.activate)
	
	for (var k in extra.commands) {
		source.commands[k] = extra.commands[k]
	}
	for (var k in extra.exports) {
		source.exports[k] = extra.exports[k]
	}

	return source;
}