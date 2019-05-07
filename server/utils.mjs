import { join } from 'path';
import { fileURLToPath } from 'url';

export const pathFromLocation = ({ url }, ...args) => join(fileURLToPath(url), '..', ...args);
