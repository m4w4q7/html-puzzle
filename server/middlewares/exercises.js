import createStaticMiddleware from 'koa-static';
import { pathFromLocation } from '../utils.js';

const root = pathFromLocation(import.meta, '../../exercises');

export const exercisesMiddleware = createStaticMiddleware(root);
