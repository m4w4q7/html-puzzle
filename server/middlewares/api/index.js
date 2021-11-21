import Router from 'koa-router';
import { sessionMiddleware } from '../session.js';
import { bodyParserMiddleware } from '../body-parser.js';
import getUser from './users/get.js';
import postUser from './users/post.js';
import getResults from './results/get.js';
import postResult from './results/post.js';
import listExercises from './exercises/get.js';
import getExercise from './exercises/id-get.js';
import signout from './signout.js';


export const apiMiddleware = new Router()
  .get('/users', sessionMiddleware, getUser)
  .post('/users', sessionMiddleware, bodyParserMiddleware, postUser)
  .get('/results', sessionMiddleware, getResults)
  .post('/results', sessionMiddleware, bodyParserMiddleware, postResult)
  .get('/exercises', listExercises)
  .get('/exercises/:id', getExercise)
  .get('/signout', signout)
  .routes();
