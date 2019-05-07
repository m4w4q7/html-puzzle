import { createOpenIdClient } from '../create-openid-client.js';
import { config } from '../../../config.js';

const CALLBACK_PATH = 'authenticate/google/callback';
export const redirectUrl = Object.assign(new URL(config.hostUrl), { pathname: CALLBACK_PATH }).href;

const client = createOpenIdClient({
  discoveryUrl: 'https://accounts.google.com',
  clientId: config.google.clientId,
  clientSecret: config.google.clientSecret
});


export const getClient = () => client;

