import { Environment } from "./Environment";

/**
 * Execute the appropriate commands into a shell environment.
 */
export class ShellEnvironment implements Environment {
	/**
	 * Sets the given variable into the host environment variable.
	 */
	setVariable(name: string, value: string) : void {
		console.log(name + "='" + value + "'");
	}
	
	/**
	 * Log the message.
	 */
	log(message: string) : void {
		console.log("echo '" + message + "'");
	}
	
	/**
	 * Define a new command, that will launch the given string when
	 * called.
	 */
	defineCommand(name: string, executeWhat: string) : void {
		console.log("alias " + name + "='" + executeWhat + "'");
	}
	
	/**
	 * Remove a previously set command if it exists.
	 */
	removeCommand(name: string) : void {
		console.log("unalias " + name);
	} 
}