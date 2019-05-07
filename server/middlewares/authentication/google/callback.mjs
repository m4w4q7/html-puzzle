import { getClient, redirectUrl } from './client.mjs';

export default async (context) => {
  const client = await getClient();
  const tokenSet = await client.authorizationCallback(redirectUrl, context.request.query);
  context.body = 'Success';
};
