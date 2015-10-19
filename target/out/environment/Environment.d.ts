/**
 * Allows setting environment variables, outputting messages, or
 * defining commands.
 */
export interface Environment {
    /**
     * Sets the given variable into the host environment variable.
     */
    setVariable(name: string, value: string): Environment;
    /**
     * Unsets the given variable name from the host environment.
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
     * Execute a command in the environment.
     */
    execute(what: string): Environment;
    /**
     * Flushes the built script to the execution environment. The flush() code
     * can be called only once, when the script has done its processing.
     */
    flush(): Environment;
}
