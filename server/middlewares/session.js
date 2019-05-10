/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import { config } from '../config.js';


export const sessionMiddleware = async (context, next) => {
  try {
    const userData = jwt.verify(context.cookies.get('auth_token'), config.authSecret);
    context.state.user = userData;
    await next();
  } catch (error) {
    console.error(error.toString());
    context.cookies.set('name');
    context.cookies.set('auth_token');
    context.status = 401;
  }
};
