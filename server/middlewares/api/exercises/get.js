import { services } from '../../../services/index.js';

export default async (context) => {
  context.body = services.exercise.list();
};
