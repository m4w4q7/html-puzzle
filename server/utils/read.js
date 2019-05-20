import { readFile as readFileFs } from 'fs';


export const readFile = (path) => new Promise((resolve, reject) => {
  readFileFs(path, { encoding: 'utf8' }, (error, data) => error ? reject(error) : resolve(data));
});


export const readJSON = (path) => readFile(path).then(JSON.parse);
