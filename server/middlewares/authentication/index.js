import compose from 'koa-compose';
import route from 'koa-route';
import { googleLogin, googleCallback } from './google/index.js';

export const authenticationMiddleware = compose([
  route.get('/google/login', googleLogin),
  route.get('/google/callback', googleCallback),
]);
