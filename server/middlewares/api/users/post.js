import { users } from '../../../database/dao/users.js';

export default async (context) => {
  const newName = context.request.body.name;
  if (!newName || typeof newName !== 'string' || !context.query.id) { context.throw(400); }
  const userId = context.state.user.userId;
  if (context.query.id !== userId) { context.throw(401); }

  await users.setNameForId(userId, newName);
  context.status = 204;
};
