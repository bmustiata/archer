/// <reference path="../../../../typings/js-yaml/js-yaml.d.ts"/>
var jsYaml = require("js-yaml");
/**
 * Reads the YML data for a given project.
 */
function readProjectYml(data) {
    var loadedData = jsYaml.safeLoad(data);
    var project = loadedData.config || loadedData.layout || { name: "<broken data>" };
    ensureArray(project, "requires");
    ensureArray(project, "layouts");
    ensureArray(project, "activate");
    ensureArray(project, "deactivate");
    if (!project.exports) {
        project.exports = {};
    }
    if (!project.commands) {
        project.commands = {};
    }
    if (!project.name) {
        project.name = "<not defined>";
    }
    return project;
}
exports.readProjectYml = readProjectYml;
/**
 * Ensures the given value is an array.
 */
function ensureArray(obj, propertyName) {
    if (typeof obj[propertyName] == "string") {
        obj[propertyName] = [obj[propertyName]];
    }
    if (typeof obj[propertyName] == "undefined") {
        obj[propertyName] = [];
    }
}
//# sourceMappingURL=ProjectData.js.map