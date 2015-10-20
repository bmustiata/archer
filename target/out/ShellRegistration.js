var BashEnvironment_1 = require("./environment/BashEnvironment");
var shellEnvironment = new BashEnvironment_1.BashEnvironment();
var runMode = process.argv[2];
if (!runMode) {
    console.error("You need to define a runMode, e.g.:\n\t\n\t$ eval $(archer project)\n\t$ project -n test\n\t$ project test\n\t");
    process.exit(1);
}
shellEnvironment.defineCommand(runMode, "eval $(node " + __dirname + "/Project.js --internalRunMode=" + runMode + " $@)");
shellEnvironment.flush();
//# sourceMappingURL=ShellRegistration.js.map