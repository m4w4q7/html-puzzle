import { createTemplateFactory } from '../../create-template-factory.js';
import htmlTemplate from './template.html.js';

export const createTemplate = createTemplateFactory(htmlTemplate, {
  leftPane: '.horizontal-resizable__left-panze',
  rightPane: '.horizontal-resizable__right-pane',
  separator: '.horizontal-resizable__separator',
});
