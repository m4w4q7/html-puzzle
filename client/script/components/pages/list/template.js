import { createTemplateFactory } from '../../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  list: '.hpu-exercise-list__content',
});
