import { services } from '../../../services/index.js';

export default async (context) => {
  const id = context.params.id;
  const exercise = services.exercise.get(id);
  if (!exercise) { context.throw(404); }
  context.body = exercise;
};
