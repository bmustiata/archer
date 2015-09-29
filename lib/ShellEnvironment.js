/**
 * Generates commands for the shell in order to alter it via simple evals
 * such as: eval `$(node $CURRENT_FOLDER/../lib/Project.js $@)`. The commands
 * are only tested against bash.
 */
var ShellEnvironment = (function () {
    function ShellEnvironment() {
        this._execution = "";
    }
    /**
     * Sets the given variable into the host environment variable.
     */
    ShellEnvironment.prototype.setVariable = function (name, value) {
        this._execution += shellEscape(name) + "='" + shellEscape(value) + "'\n";
        return this;
    };
    /**
     * Log the message.
     */
    ShellEnvironment.prototype.log = function (message) {
        this._execution += "echo -e $'" + shellEscape(message) + "'\n";
        return this;
    };
    /**
     * Define a new command, that will launch the given string when
     * called.
     */
    ShellEnvironment.prototype.defineCommand = function (name, executeWhat) {
        this._execution += "function " + shellEscape(name) + "() {\t" +
            executeWhat.split("\n").join("\n\t") +
            "\n}\n";
        return this;
    };
    /**
     * Remove a previously set command if it exists.
     */
    ShellEnvironment.prototype.removeCommand = function (name) {
        this._execution += "unset -f " + shellEscape(name) + "\n";
        return this;
    };
    /**
     * Execute the command in the user environment.
     */
    ShellEnvironment.prototype.execute = function (what) {
        this._execution += shellEscape(what) + "\n";
        return this;
    };
    /**
     * Flush the commands to the actual executor.
     */
    ShellEnvironment.prototype.flush = function () {
        console.log(this._execution.replace(/\n/g, ";"));
        return this;
    };
    return ShellEnvironment;
})();
exports.ShellEnvironment = ShellEnvironment;
/**
 * Escapes a string, so it can be outputed by an `echo -e $'message'` command.
 */
function shellEscape(message) {
    if (typeof message !== "string") {
        message = "" + message;
    }
    return message.replace(/\n/g, "\\n")
        .replace(/'/g, "\\'");
}
//# sourceMappingURL=ShellEnvironment.js.map