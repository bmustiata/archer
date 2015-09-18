/**
 * Execute the appropriate commands into a shell environment.
 */
var ShellEnvironment = (function () {
    function ShellEnvironment() {
    }
    /**
     * Sets the given variable into the host environment variable.
     */
    ShellEnvironment.prototype.setVariable = function (name, value) {
        console.log(name + "='" + value + "'");
    };
    /**
     * Log the message.
     */
    ShellEnvironment.prototype.log = function (message) {
        console.log("echo '" + message + "'");
    };
    /**
     * Define a new command, that will launch the given string when
     * called.
     */
    ShellEnvironment.prototype.defineCommand = function (name, executeWhat) {
        console.log("alias " + name + "='" + executeWhat + "'");
    };
    /**
     * Remove a previously set command if it exists.
     */
    ShellEnvironment.prototype.removeCommand = function (name) {
        console.log("unalias " + name);
    };
    return ShellEnvironment;
})();
exports.ShellEnvironment = ShellEnvironment;
