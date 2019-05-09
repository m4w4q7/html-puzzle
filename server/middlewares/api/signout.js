export default async (context) => {
  context.cookies.set('name');
  context.cookies.set('auth_token');
  context.status = 204;
};
