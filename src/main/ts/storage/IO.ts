import * as fs from "fs";
import * as path from "path";

export interface FileName {
	name: string
	fullPath: string
}

export interface FileStat {
	file: FileName
	stat: fs.Stats
}

export function readDir(folderPath: string) : Array<FileName> {
	return fs.readdirSync(folderPath)
		.map(it => { 
			return {
				name: it,
				fullPath : path.join(folderPath, it)
			}
		});
}

export function fstat(folderPath: string) : fs.Stats {
	try {
		return fs.statSync(folderPath);
	} catch(e) {
		return null;
	}
}
