import Router from 'koa-router';
import { sessionMiddleware } from '../session.js';
import getUserByName from './users/name.js';
import signout from './signout.js';


export const apiMiddleware = new Router()
  .get('/users/:name', sessionMiddleware, getUserByName)
  .get('/signout', signout)
  .routes();
