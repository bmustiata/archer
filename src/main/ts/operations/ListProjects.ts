import * as path from "path"

import {Environment} from "../environment/Environment"
import {archerHome} from "../environment/ReadEnvironment"
import {ParsedShellParameters} from "../environment/ReadShellParameters"
import {FileStat, fstat, readDir} from "../storage/IO"

export function listProjects(shellEnvironment : Environment, shellParameters: ParsedShellParameters) {
	var projectsFolder: string = shellParameters.layout ?
			archerHome(shellParameters.internalRunMode + "s/layouts") : 
			archerHome(shellParameters.internalRunMode + "s") 
	
	try {
		shellEnvironment.execute("mkdir -p " + path.normalize(projectsFolder));
		readDir(projectsFolder)
			.map((it) => {
				return <FileStat> {
					file: it,
					stat : fstat(it.fullPath)
				};
			})
			.filter(it => it.stat && it.stat.isFile())
			//.map(readProjectYml)
			.forEach(it => shellEnvironment.log(it.file.name))
	} catch(e) {
		shellEnvironment.log("ERROR: " + e.toString() + ':\n' + e.stack);
		shellEnvironment.log("ERROR: Unable to read projects from: " + projectsFolder);
	}
}
