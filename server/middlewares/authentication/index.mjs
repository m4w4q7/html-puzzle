import compose from 'koa-compose';
import route from 'koa-route';
import { googleLogin, googleCallback } from './google/index.mjs';

export const authenticationMiddleware = compose([
  route.get('/google/login', googleLogin),
  route.get('/google/callback', googleCallback),
]);
