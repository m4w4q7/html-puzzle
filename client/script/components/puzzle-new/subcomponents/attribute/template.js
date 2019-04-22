import { createTemplateFactory } from '../../../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  name: '.hpu-puzzle-attribute__name',
  value: '.hpu-puzzle-attribute__value',
  valueContainer: '.hpu-puzzle-attribute__value-container',
});
