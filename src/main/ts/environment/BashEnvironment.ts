import { Environment } from "./Environment";

/**
 * Generates commands for the shell in order to alter it via simple evals
 * such as: eval `$(node $CURRENT_FOLDER/../lib/Project.js $@)`. The commands
 * are only tested against bash.
 */
export class BashEnvironment implements Environment {
	_execution = "";
	
	/**
	 * Sets the given variable into the host environment variable.
	 */
	setVariable(name: string, value: string) : Environment {
		this._execution += "export " + shellEscape(name) + "='" + shellEscape(value) + "'\n";
		return this;
	}
	
	/**
	 * Unsets the given variable from the host environment.
	 */
	unsetVariable(name: string): Environment {
		this._execution += "unset " + shellEscape(name) + "\n";
		return this;
	}
	
	/**
	 * Log the message.
	 */
	log(message: string) : Environment {
		this._execution += "echo -e $'" + shellEscape(message) + "'\n";
		return this;
	}
	
	/**
	 * Define a new command, that will launch the given string when
	 * called.
	 */
	defineCommand(name: string, executeWhat: string) : Environment {
		this._execution += "function " + shellEscape(name) + "() {\t" + 
				executeWhat.split("\n")
					.filter((line) => !!line)
					.join("\n\t") + 
				"\n}\n";
		return this;
	}
	
	/**
	 * Remove a previously set command if it exists.
	 */
	removeCommand(name: string) : Environment {
		this._execution += "unset -f " + shellEscape(name) + "\n";
		return this;
	}
	
	/**
	 * Execute the command in the user environment.
	 */
	execute(what: string) : Environment {
		this._execution += shellEscape(what) + "\n";
		return this;
	}
	
	/**
	 * Flush the commands to the actual executor.
	 */
	flush() : Environment {
		console.log(this._execution.replace(/\n/g, ";"));
		return this;
	}
}

/**
 * Escapes a string, so it can be outputed by an `echo -e $'message'` command.
 */
function shellEscape(message : string) : string {
	if (typeof message !== "string") {
		message = "" + message;
	}
	
	return message.replace(/\n/g, "\\n")
		.replace(/'/g, "\\'");
} 