import { pathFromLocation } from '../../../../../utils/path-from-location.js';
import { readFile } from '../../../../../utils/read.js';
import { ids } from '../../shared.js';

export default {
  _id: ids.exercises.navigationBar,
  name: 'Navigation bar',
  pug: await readFile(pathFromLocation(import.meta, 'index.pug')),
  cssUrls: ['https://redirector.eservice.emarsys.net/ui/latest/css/app.css'],
  jsUrls: ['https://redirector.eservice.emarsys.net/ui/latest/js/app.js'],
  documentationUrl: 'https://redirector.eservice.emarsys.net/ui/latest/doc/navigation.html',
};
