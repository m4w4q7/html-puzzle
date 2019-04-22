import { createTemplateFactory } from '../../../../create-template-factory.js';

const componentTemplateHtml =
  `<span class="hpu-puzzle-attribute-list__wrapper" style="display: none;">` +
    `(<span class="hpu-puzzle-attribute-list__attribute-container"></span>)` +
  `</span>`;


export const createComponentTemplate = createTemplateFactory(componentTemplateHtml, {
  wrapper: '.hpu-puzzle-attribute-list__wrapper',
  attributeContainer: '.hpu-puzzle-attribute-list__attribute-container',
});


export const createSeparator = createTemplateFactory(', ');
