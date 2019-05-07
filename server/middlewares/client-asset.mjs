import createStaticMiddleware from 'koa-static';
import { pathFromLocation } from '../utils.mjs';

const root = pathFromLocation(import.meta, '../../client');

export const clientAssetMiddleware = createStaticMiddleware(root);
