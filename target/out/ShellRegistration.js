var BashEnvironment_1 = require("./environment/BashEnvironment");
var shellEnvironment = new BashEnvironment_1.BashEnvironment();
var runMode = process.argv[2];
if (!runMode) {
    shellEnvironment.log("You need to define a runMode");
    shellEnvironment.flush();
    process.exit(1);
}
shellEnvironment.defineCommand(runMode, "eval $(node " + __dirname + "/Project.js --internalRunMode=" + runMode + " $@)");
shellEnvironment.flush();
//# sourceMappingURL=ShellRegistration.js.map