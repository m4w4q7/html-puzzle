import { createTemplateFactory } from '../../../../create-template-factory.js';
import templateHtml from './template.html.js';

export const createTemplate = createTemplateFactory(templateHtml, {
  tagName: '.hpu-puzzle-element__tag-name',
  id: '.hpu-puzzle-element__id',
  classList: '.hpu-puzzle-element__class-list',
  attributeList: '.hpu-puzzle-element__attribute-list',
  blockList: '.hpu-puzzle-element__block-list'
});
