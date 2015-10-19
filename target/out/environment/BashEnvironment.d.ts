import { Environment } from "./Environment";
/**
 * Generates commands for the shell in order to alter it via simple evals
 * such as: eval `$(node $CURRENT_FOLDER/../lib/Project.js $@)`. The commands
 * are only tested against bash.
 */
export declare class BashEnvironment implements Environment {
    _execution: string;
    /**
     * Sets the given variable into the host environment variable.
     */
    setVariable(name: string, value: string): Environment;
    /**
     * Unsets the given variable from the host environment.
     */
    unsetVariable(name: string): Environment;
    /**
     * Log the message.
     */
    log(message: string): Environment;
    /**
     * Define a new command, that will launch the given string when
     * called.
     */
    defineCommand(name: string, executeWhat: string): Environment;
    /**
     * Remove a previously set command if it exists.
     */
    removeCommand(name: string): Environment;
    /**
     * Execute the command in the user environment.
     */
    execute(what: string): Environment;
    /**
     * Flush the commands to the actual executor.
     */
    flush(): Environment;
}
