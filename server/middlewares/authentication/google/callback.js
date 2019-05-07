import { getClient, redirectUrl } from './client.js';
import { renderJsRedirect } from '../../../utils/render-js-redirect.js';

export default async (context) => {
  const client = await getClient();
  const tokenSet = await client.authorizationCallback(redirectUrl, context.request.query);
  context.cookies.set('email', tokenSet.claims.email, { httpOnly: false });
  context.body = renderJsRedirect('/');
};
