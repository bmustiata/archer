import * as path from "path"
import * as fs from "fs"

import {Environment} from "../environment/Environment"
import {projectFolder} from "../environment/ReadEnvironment"
import {ParsedShellParameters} from "../environment/ReadShellParameters"
import {FileStat, fstat, readDir} from "../storage/IO"
import {readProjectYml} from "../storage/ProjectData"

export function listProjects(shellEnvironment : Environment, shellParameters: ParsedShellParameters) {
	var folder = projectFolder(shellParameters) 
	
	shellEnvironment.log("Available projects:")
	
	try {
		readDir(folder)
			.map((it) => {
				return <FileStat> {
					file: it,
					stat : fstat(it.fullPath)
				};
			})
			.filter(it => it.stat && it.stat.isFile())
			.map((it) => {
				var fileData = fs.readFileSync(it.file.fullPath, 'utf-8')
				var projectData = readProjectYml(fileData)
				
				return {
					fileName: it.file.name,
					projectName: projectData.name
				}
			})
			.forEach(it => shellEnvironment.log(" - " + it.fileName + ": " + it.projectName))
	} catch(e) {
		shellEnvironment.log("ERROR: " + e.toString() + ':\n' + e.stack);
		shellEnvironment.log("ERROR: Unable to read projects from: " + folder);
	}
}
