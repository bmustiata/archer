/**
 * Generates commands for the shell in order to alter it via simple evals
 * such as: eval `$(node $CURRENT_FOLDER/../lib/Project.js $@)`. The commands
 * are only tested against bash.
 */
var ShellEnvironment = (function () {
    function ShellEnvironment() {
    }
    /**
     * Sets the given variable into the host environment variable.
     */
    ShellEnvironment.prototype.setVariable = function (name, value) {
        process.stdout.write(shellEscape(name) + "='" + shellEscape(value) + "';");
        return this;
    };
    /**
     * Log the message.
     */
    ShellEnvironment.prototype.log = function (message) {
        process.stdout.write("echo -e $'" + shellEscape(message) + "';");
        return this;
    };
    /**
     * Define a new command, that will launch the given string when
     * called.
     */
    ShellEnvironment.prototype.defineCommand = function (name, executeWhat) {
        process.stdout.write("alias $'" + shellEscape(name) + "'=$'" + shellEscape(executeWhat) + "';");
        return this;
    };
    /**
     * Remove a previously set command if it exists.
     */
    ShellEnvironment.prototype.removeCommand = function (name) {
        process.stdout.write("unalias $'" + shellEscape(name) + "';");
        return this;
    };
    /**
     * Execute the command in the user environment.
     */
    ShellEnvironment.prototype.execute = function (what) {
        process.stdout.write(shellEscape(what) + ";");
        return this;
    };
    return ShellEnvironment;
})();
exports.ShellEnvironment = ShellEnvironment;
/**
 * Escapes a string, so it can be outputed by an `echo -e $'message'` command.
 */
function shellEscape(message) {
    return message.replace(/\n/g, "\\n")
        .replace(/'/g, "\\'");
}
