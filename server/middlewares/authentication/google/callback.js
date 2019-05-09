/* eslint-disable no-constant-condition */
import { getClient, redirectUrl } from './client.js';
import { renderJsRedirect } from '../../../utils/render-js-redirect.js';
import { users } from '../../../database/dao/users.js';

export default async (context) => {
  const client = await getClient();
  const tokenSet = await client.authorizationCallback(redirectUrl, context.request.query);
  const user = await getOrCreateUser(tokenSet.claims.sub, tokenSet.claims.email);

  context.cookies.set('name', user.name, { httpOnly: false });
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
