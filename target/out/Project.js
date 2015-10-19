var ReadShellParameters_1 = require("./environment/ReadShellParameters");
var BashEnvironment_1 = require("./environment/BashEnvironment");
var ListProjects_1 = require("./operations/ListProjects");
var CreateProject_1 = require("./operations/CreateProject");
var EditProject_1 = require("./operations/EditProject");
var EmptyRun_1 = require("./operations/EmptyRun");
var SelectProject_1 = require("./operations/SelectProject");
var shellEnvironment = new BashEnvironment_1.BashEnvironment();
var shellParameters = ReadShellParameters_1.parseParameters(shellEnvironment);
if (shellParameters.list) {
    ListProjects_1.listProjects(shellEnvironment, shellParameters);
}
else if (shellParameters["new"]) {
    CreateProject_1.createNewProject(shellEnvironment, shellParameters);
}
else if (shellParameters["edit"]) {
    EditProject_1.editProject(shellEnvironment, shellParameters);
}
else {
    if (!shellParameters._.length) {
        EmptyRun_1.emptyProjectsRun(shellEnvironment, shellParameters);
    }
    else {
        SelectProject_1.selectProject(shellEnvironment, shellParameters);
    }
}
shellEnvironment.flush();
//# sourceMappingURL=Project.js.map