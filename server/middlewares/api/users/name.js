import { users } from '../../../database/dao/users.js';

export default async (context) => {
  const user = await users.getByName(context.params.name);
  context.body = { found: !!user };
};
