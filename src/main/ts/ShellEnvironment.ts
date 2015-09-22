import { Environment } from "./Environment";

/**
 * Execute the appropriate commands into a shell environment.
 */
export class ShellEnvironment implements Environment {
	/**
	 * Sets the given variable into the host environment variable.
	 */
	setVariable(name: string, value: string) : void {
		process.stdout.write(shellEscape(name) + "='" + shellEscape(value) + "';");
	}
	
	/**
	 * Log the message.
	 */
	log(message: string) : void {
		process.stdout.write("echo -e $'" + shellEscape(message) + "';");
	}
	
	/**
	 * Define a new command, that will launch the given string when
	 * called.
	 */
	defineCommand(name: string, executeWhat: string) : void {
		process.stdout.write("alias $'" + shellEscape(name) + "'=$'" + shellEscape(executeWhat) + "';");
	}
	
	/**
	 * Remove a previously set command if it exists.
	 */
	removeCommand(name: string) : void {
		process.stdout.write("unalias $'" + shellEscape(name) + "';");
	}
}

/**
 * Escapes a string, so it can be outputed by an `echo -e $'message'` command.
 */
function shellEscape(message : string) : string {
	return message.replace(/\n/g, "\\n")
		.replace(/'/g, "\\'");
} 