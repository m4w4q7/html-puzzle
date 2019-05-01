import { createTemplateFactory } from '../../../../create-template-factory.js';
import templateHtml from './template.html.js';

export const createTemplate = createTemplateFactory(templateHtml, {
  blockList: '.hpu-puzzle-content__block-list',
  blockInserter: '.hpu-puzzle-content__block-inserter',
  characterSpecimen: '.hpu-puzzle-content__character-specimen',
});
