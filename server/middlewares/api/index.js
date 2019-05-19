import Router from 'koa-router';
import { sessionMiddleware } from '../session.js';
import { bodyParserMiddleware } from '../body-parser.js';
import getUser from './users/get.js';
import postUser from './users/post.js';
import postResult from './results/post.js';
import signout from './signout.js';


export const apiMiddleware = new Router()
  .get('/users', sessionMiddleware, getUser)
  .post('/users', sessionMiddleware, bodyParserMiddleware, postUser)
  .post('/results', sessionMiddleware, bodyParserMiddleware, postResult)
  .get('/signout', signout)
  .routes();
