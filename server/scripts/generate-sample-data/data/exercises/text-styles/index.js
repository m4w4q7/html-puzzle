import { pathFromLocation } from '../../../../../utils/path-from-location.js';
import { readFile } from '../../../../../utils/read.js';
import { ids } from '../../shared.js';

export default {
  _id: ids.exercises.textStyles,
  name: 'Another Basic Example',
  pug: await readFile(pathFromLocation(import.meta, 'index.pug')),
  css: await readFile(pathFromLocation(import.meta, 'style.css')),
  js: await readFile(pathFromLocation(import.meta, 'script.js')),
};
