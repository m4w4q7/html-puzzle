import openidClient from 'openid-client';

export const createOpenIdClient = async ({ discoveryUrl, clientId, clientSecret }) => {

  const issuer = await openidClient.Issuer.discover(discoveryUrl);

  return  new issuer.Client({
    client_id: clientId,
    client_secret: clientSecret
  });

};
