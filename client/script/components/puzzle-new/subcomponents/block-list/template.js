import { createTemplateFactory } from '../../../../create-template-factory.js';

export const createTemplate = createTemplateFactory('<div class="hpu-puzzle-block-list__container"></div>', {
  container: '.hpu-puzzle-block-list__container',
  blocks: () => []
});
