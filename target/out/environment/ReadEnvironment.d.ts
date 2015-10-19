import { ParsedShellParameters } from "./ReadShellParameters";
/**
 * Returns the current project ID. This corresponds
 * to the YML file where the project is described.
 */
export declare function currentProject(runMode: string): string;
/**
 * Returns the archer home.
 */
export declare function archerHome(subPath?: string): string;
/**
 * Exports the chosen project work folder.
 */
export declare function projectFolder(shellParameters: ParsedShellParameters): string;
