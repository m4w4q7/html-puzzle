import { createTemplateFactory } from '../../../../create-template-factory.js';

const componentTemplateHtml = `<span class="hpu-puzzle-attribute-list__container"></span>`;

export const createComponentTemplate = createTemplateFactory(componentTemplateHtml, {
  container: '.hpu-puzzle-attribute-list__container',
  attributes: () => ({})
});
