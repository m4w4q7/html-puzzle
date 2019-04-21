import { createTemplateFactory } from '../../../../create-template-factory.js';

const componentTemplateHtml =
  `<span class="wrapper" style="display: none;">` +
    `(<span class="attribute-container"></span>)` +
  `</span>`;


export const createComponentTemplate = createTemplateFactory(componentTemplateHtml, {
  wrapper: '.wrapper',
  attributeContainer: '.attribute-container',
});


export const createSeparator = createTemplateFactory(', ');
