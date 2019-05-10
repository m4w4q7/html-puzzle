import { users } from '../../../database/dao/users.js';
import { escapeForMongo } from '../../../utils/escape-for-mongo.js';

export default async (context) => {
  const name = escapeForMongo(context.query.name);
  const user = await users.getByName(name);
  context.body = { found: !!user };
};
