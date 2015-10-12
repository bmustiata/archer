import * as path from "path"
import * as fs from "fs"

import {Environment} from "../environment/Environment"
import {archerHome} from "../environment/ReadEnvironment"
import {readProjectYml} from "../storage/ProjectData"

/**
 * Select the given project.
 */
export function selectProject(shellEnvironment: Environment, params : Array<string>) {
	var projectName = params[0]
	var projectsFolder: string = archerHome("projects")

	var projectFile = path.join(projectsFolder, projectName + ".yml")
	
	var fileData = fs.readFileSync(projectFile, 'utf-8')
	
	var projectData = readProjectYml(fileData); 
	
	shellEnvironment.log("select project: " + JSON.stringify(projectData))
}