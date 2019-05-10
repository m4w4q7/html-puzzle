/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import { config } from '../config.js';


export const sessionMiddleware = async (context, next) => {
  const authToken = context.cookies.get('auth_token');
  if (!authToken) { context.throw(401); }
  try {
    const userData = jwt.verify(authToken, config.authSecret);
    context.state = context.state || {};
    context.state.user = userData;
  } catch (error) {
    console.error(error.toString());
    context.cookies.set('name');
    context.cookies.set('auth_token');
    context.throw(401);
  }
  await next();
};
