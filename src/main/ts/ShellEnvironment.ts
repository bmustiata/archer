import { Environment } from "./Environment";

/**
 * Generates commands for the shell in order to alter it via simple evals
 * such as: eval `$(node $CURRENT_FOLDER/../lib/Project.js $@)`. The commands
 * are only tested against bash.
 */
export class ShellEnvironment implements Environment {
	/**
	 * Sets the given variable into the host environment variable.
	 */
	setVariable(name: string, value: string) : Environment {
		process.stdout.write(shellEscape(name) + "='" + shellEscape(value) + "';");
		return this;
	}
	
	/**
	 * Log the message.
	 */
	log(message: string) : Environment {
		process.stdout.write("echo -e $'" + shellEscape(message) + "';");
		return this;
	}
	
	/**
	 * Define a new command, that will launch the given string when
	 * called.
	 */
	defineCommand(name: string, executeWhat: string) : Environment {
		process.stdout.write("alias $'" + shellEscape(name) + "'=$'" + shellEscape(executeWhat) + "';");
		return this;
	}
	
	/**
	 * Remove a previously set command if it exists.
	 */
	removeCommand(name: string) : Environment {
		process.stdout.write("unalias $'" + shellEscape(name) + "';");
		return this;
	}
	
	/**
	 * Execute the command in the user environment.
	 */
	execute(what: string) : Environment {
		process.stdout.write(shellEscape(what) + ";");
		return this;
	}
}

/**
 * Escapes a string, so it can be outputed by an `echo -e $'message'` command.
 */
function shellEscape(message : string) : string {
	return message.replace(/\n/g, "\\n")
		.replace(/'/g, "\\'");
} 