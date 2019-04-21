import { createTemplateFactory } from '../../../../create-template-factory.js';

export const createTemplate = createTemplateFactory('<div class="container"></div>', {
  container: '.container'
});
