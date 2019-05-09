import Router from 'koa-router';
import { googleLogin, googleCallback } from './google/index.js';


export const authenticationMiddleware = new Router()
  .get('/google/login', googleLogin)
  .get('/google/callback', googleCallback)
  .routes();
