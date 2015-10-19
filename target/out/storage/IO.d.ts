import * as fs from "fs";
export interface FileName {
    name: string;
    fullPath: string;
}
export interface FileStat {
    file: FileName;
    stat: fs.Stats;
}
export declare function readDir(folderPath: string): Array<FileName>;
export declare function fstat(folderPath: string): fs.Stats;
