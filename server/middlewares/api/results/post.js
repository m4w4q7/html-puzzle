import { results } from '../../../database/dao/results.js';

export default async (context) => {
  const exerciseId = context.request.body.exercise.id;
  const hintsUsed = parseInt(context.request.body.result.hintsUsed);
  const timeTaken = parseInt(context.request.body.result.timeTaken);
  if (!exerciseId || isNaN(hintsUsed) || isNaN(timeTaken)) { context.throw(400); }
  const userId = context.state.user.userId;
  const createdAt = new Date();

  const newDocument = {
    exercise: { id: exerciseId },
    user: { id: userId },
    result: { hintsUsed, timeTaken },
    createdAt
  };

  await results.insertOne(newDocument);
  context.status = 204;
};
