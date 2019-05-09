import jwt from 'jsonwebtoken';
import { config } from '../config.js';


export const createAuthToken = (userId) => {
  const expiresIn = (config.sessionHours + 1) * 3600;
  return jwt.sign({ userId }, config.authSecret, { expiresIn });
};


