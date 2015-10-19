/// <reference path="../../../typings/js-yaml/js-yaml.d.ts" />
/**
 * Project data that is being read from the yml files.
 */
export interface ProjectData {
    /**
     * The visual display name of the project.
     */
    name: string;
    /**
     * The parent project where it inherits the activate/deactivate
     * scripts, or requires, exports and commands.
     */
    layouts: Array<string>;
    /**
     * Scripts to execute when the project is initially activated.
     * The scripts are ordered from the existing layouts.
     */
    activate: Array<string>;
    /**
     * Scripts to execute when the project is deactivated.
     * The scripts are ordered from the existing layouts,
     * in reverse order.
     */
    deactivate: Array<string>;
    /**
     * Environment variables that are required to be present for this
     * project to be activated.
     */
    requires: Array<string>;
    /**
     * Define the variables that are exported by this project. These
     * exports will be evaluated before the activate, and their values
     * are evaluated as shell scritps.
     */
    exports: {
        [name: string]: string;
    };
    /**
     * Commands that are defined by this project.
     */
    commands: {
        [name: string]: string;
    };
}
/**
 * Reads the YML data for a given project.
 */
export declare function readProjectYml(data: string): ProjectData;
