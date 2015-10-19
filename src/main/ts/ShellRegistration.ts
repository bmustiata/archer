
import {BashEnvironment} from "./environment/BashEnvironment"

var shellEnvironment = new BashEnvironment();
var runMode = process.argv[2]

if (!runMode) {
	shellEnvironment.log("You need to define a runMode")
	shellEnvironment.flush()
	process.exit(1)
}

shellEnvironment.defineCommand(runMode, "eval $(node " + __dirname + "/Project.js --internalRunMode=" + runMode + " $@)")
shellEnvironment.flush()