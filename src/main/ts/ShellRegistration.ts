
import {BashEnvironment} from "./environment/BashEnvironment"

var shellEnvironment = new BashEnvironment();
var runMode = process.argv[2]

if (!runMode) {
	console.error(`You need to define a runMode, e.g.:
	
	$ eval $(archer project)
	$ project -n test
	$ project test
	`)
	process.exit(1)
}

shellEnvironment.defineCommand(runMode, "eval $(node " + __dirname + "/Project.js --internalRunMode=" + runMode + " $@)")
shellEnvironment.flush()