import createStaticMiddleware from 'koa-static';
import { pathFromLocation } from '../utils/path-from-location.js';

const root = pathFromLocation(import.meta, '../../exercises');

export const exercisesMiddleware = createStaticMiddleware(root);
