import { createTemplateFactory } from '../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  name: '.hpu-exercise-list-element__name',
  best: '.hpu-exercise-list-element__best',
  rank: '.hpu-exercise-list-element__rank',
  totalUsersCompleted: '.hpu-exercise-list-element__total_users_completed',
  action: '.hpu-exercise-list-element__action',
});
