import { pathFromLocation } from '../../../../../utils/path-from-location.js';
import { readFile } from '../../../../../utils/read.js';
import { ids } from '../../shared.js';

export default {
  _id: ids.exercises.simplest,
  name: 'Simplest Example',
  pug: await readFile(pathFromLocation(import.meta, 'index.pug')),
  cssUrls: ['https://redirector.eservice.emarsys.net/ui/latest/css/app.css'],
  jsUrls: ['https://redirector.eservice.emarsys.net/ui/latest/js/app.js'],
};
