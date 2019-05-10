import { users } from '../../../database/dao/users.js';

export default async (context) => {
  const name = context.query.name;
  if (typeof name !== 'string' || !name) { context.throw(400); }
  const user = await users.getByName(name);
  context.body = { found: !!user };
};
