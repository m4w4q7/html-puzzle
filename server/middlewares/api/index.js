import Router from 'koa-router';
import signout from './signout.js';


export const apiMiddleware = new Router()
  .get('/signout', signout)
  .routes();
