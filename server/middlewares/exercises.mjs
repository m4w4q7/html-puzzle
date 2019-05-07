import createStaticMiddleware from 'koa-static';
import { pathFromLocation } from '../utils.mjs';

const root = pathFromLocation(import.meta, '../../exercises');

export const exercisesMiddleware = createStaticMiddleware(root);
