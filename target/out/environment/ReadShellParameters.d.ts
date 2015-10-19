/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/nomnom/nomnom.d.ts" />
import { Environment } from "./Environment";
export interface ParsedShellParameters {
    new?: string;
    edit?: boolean;
    list?: boolean;
    layout?: boolean;
    internalRunMode: string;
    _: Array<string>;
}
/**
 * Parse the process parameters.
 */
export declare function parseParameters(shellEnvironment: Environment): ParsedShellParameters;
