import { createTemplateFactory } from '../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  name: '.hpu-exercise-list-element__name',
  time: '.hpu-exercise-list-element__record-time',
  hints: '.hpu-exercise-list-element__record-hints',
  rank: '.hpu-exercise-list-element__rank',
  totalUsersCompleted: '.hpu-exercise-list-element__total-users-completed',
  action: '.hpu-exercise-list-element__action',
});
