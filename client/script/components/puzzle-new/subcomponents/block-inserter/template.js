import { createTemplateFactory } from '../../../../create-template-factory.js';
import templateHtml from './template.html.js';

export const createTemplate = createTemplateFactory(templateHtml, {
  positioner: '.hpu-puzzle-block-inserter__positioner',
  indentationContainer: '.hpu-puzzle-block-inserter__indentation-container',
  indentations: () => []
});
