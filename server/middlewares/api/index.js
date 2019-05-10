import Router from 'koa-router';
import { sessionMiddleware } from '../session.js';
import getUser from './users/get.js';
import signout from './signout.js';


export const apiMiddleware = new Router()
  .get('/users', getUser)
  .get('/signout', signout)
  .routes();
