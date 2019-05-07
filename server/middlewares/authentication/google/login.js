import { getClient, redirectUrl } from './client.js';


export default async (context) => {
  const client = await getClient();
  const authorizationUrl = client.authorizationUrl({ redirect_uri: redirectUrl, scope: 'openid email' });
  context.redirect(authorizationUrl);
};
