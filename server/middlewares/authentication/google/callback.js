/* eslint-disable no-constant-condition */
import { getClient, redirectUrl } from './client.js';
import { renderJsRedirect } from '../../../utils/render-js-redirect.js';
import { users } from '../../../database/dao/users.js';
import { createAuthToken } from '../../../utils/create-auth-token.js';
import { config } from '../../../config.js';

export default async (context) => {
  const client = await getClient();
  const tokenSet = await client.authorizationCallback(redirectUrl, context.request.query);
  const user = await getOrCreateUser(tokenSet.claims.sub, tokenSet.claims.email);

  const maxAge = config.sessionHours * 3600 * 1000;
  setNameCookie(context.cookies, user.name, maxAge);
  setAuthToken(context.cookies, user._id.toString(), maxAge);
  context.body = renderJsRedirect('/');
};


const getOrCreateUser = async (googleId, email) => {
  const existingUser = await users.getByGoogleId(googleId);
  return existingUser ? existingUser : createUser(googleId, email);
};


const createUser = async (googleId, email) => {
  const name = await getUniqueName(email);
  const user = { name, googleId };
  const _id = await users.insertOne(user);
  return { ...user, _id };
};


const getUniqueName = async (email) => {
  const nameFromEmail = /[^@]*/.exec(email)[0];
  const usersWithSamePrefix = await users.listNamesByPrefix(nameFromEmail);
  if (!usersWithSamePrefix.includes(nameFromEmail)) { return nameFromEmail; }
  for (let i = 2; true; i++) {
    const name = nameFromEmail + i;
    if (!usersWithSamePrefix.includes(name)) { return name; }
  }
};


const setNameCookie = (cookies, name, maxAge) => {
  cookies.set('name', name, { httpOnly: false, maxAge });
};


const setAuthToken = (cookies, userId, maxAge) => {
  const token = createAuthToken(userId);
  cookies.set('auth_token', token, { maxAge });
};
