export const config = {
  hostUrl: process.env.HOST_URL || 'http://localhost:5500',
  port: process.env.PORT || 5500,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }
};
