import { createOpenIdClient } from '../create-openid-client.mjs';
import { config } from '../../../config.mjs';

const path = 'authenticate/google/callback';
export const redirectUrl = Object.assign(new URL(config.hostUrl), { port: config.port, pathname: path }).href;

const client = createOpenIdClient({
  discoveryUrl: 'https://accounts.google.com',
  clientId: config.google.clientId,
  clientSecret: config.google.clientSecret
});


export const getClient = () => client;

