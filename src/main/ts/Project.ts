import {parseParameters} from "./environment/ReadShellParameters"
import {BashEnvironment} from "./environment/BashEnvironment"

import {listProjects} from "./operations/ListProjects"
import {createNewProject} from "./operations/CreateProject"
import {editProject} from "./operations/EditProject"
import {emptyProjectsRun} from "./operations/EmptyRun"
import {selectProject} from "./operations/SelectProject"

var shellEnvironment = new BashEnvironment();
var shellParameters = parseParameters(shellEnvironment); 

if (shellParameters.list) {
	listProjects(shellEnvironment, shellParameters);
} else if (shellParameters["new"]) {
	createNewProject(shellEnvironment, shellParameters);
} else if (shellParameters["edit"]) {
	editProject(shellEnvironment, shellParameters);
} else { // project selection or empty run.
	if (!shellParameters._.length) {
		emptyProjectsRun(shellEnvironment, shellParameters);
	} else {
		selectProject(shellEnvironment, shellParameters);
	}
}

shellEnvironment.flush();
