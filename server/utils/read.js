import { readFile as readFileFs } from 'fs/promises';

export const readFile = (path) => readFileFs(path, { encoding: 'utf8' });

export const readJSON = (path) => readFile(path).then(JSON.parse);
