import { createTemplateFactory } from '../../../../create-template-factory.js';
import templateHtml from './template.html.js';

export const createTemplate = createTemplateFactory(templateHtml, {
  tagName: '.tag-name',
  id: '.id',
  classList: '.class-list',
  attributeList: '.attribute-list',
  blockList: '.block-list'
});
