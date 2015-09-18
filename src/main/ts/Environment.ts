// just a module to do interaction with the user environment.

/**
 * Allows setting environment variables, outputting messages, or
 * defining commands.
 */
export interface Environment {
	/**
	 * Sets the given variable into the host environment variable.
	 */
	setVariable(name: string, value: string) : void;
	
	/**
	 * Log the message.
	 */
	log(message: string) : void;
	
	/**
	 * Define a new command, that will launch the given string when
	 * called.
	 */
	defineCommand(name: string, executeWhat: string) : void;
	
	/**
	 * Remove a previously set command if it exists.
	 */
	removeCommand(name: string) : void; 
}
