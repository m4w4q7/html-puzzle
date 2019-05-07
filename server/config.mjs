export const config = {
  hostUrl: process.env.HOST_URL || 'http://localhost',
  port: process.env.PORT || 5500,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }
};
