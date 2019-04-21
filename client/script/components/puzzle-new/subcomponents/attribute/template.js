import { createTemplateFactory } from '../../../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  name: '.name',
  value: '.value',
  valueContainer: '.value-container',
});
