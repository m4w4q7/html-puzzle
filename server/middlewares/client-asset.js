import createStaticMiddleware from 'koa-static';
import { pathFromLocation } from '../utils/path-from-location.js';

const root = pathFromLocation(import.meta, '../../client');

export const clientAssetMiddleware = createStaticMiddleware(root);
