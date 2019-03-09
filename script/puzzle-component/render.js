import { dragTypes } from './enums.js';


export const render = domModel => renderWithoutLastInserter(domModel);


const renderWithoutLastInserter = domModel => domModel.map(renderBlock).join('\n');


const renderBlock = (block) => {
  const dragType = block.type === 'element' ? dragTypes.element : dragTypes.text;
  return [
    `<div class="hpu-puzzle__block" data-draggable data-drag-type="${dragType}">`,
    block.type === 'element' ? renderElement(block) : renderText(block),
    '</div>'
  ].join('');
};


const renderElement = (element) => {
  return [
    '<div class="hpu-puzzle__line">',
    renderTagName(element.tagName),
    renderId(element.id),
    renderClasses(element.classList),
    renderAttributes(element.attributes),
    '</div>',
    renderChildren(element.children),
  ].join('');
};


const renderTagName = (tagName) => {
  return `<span class="hpu-puzzle__tag-name">${tagName}</span>`;
};


const renderId = (id) => {
  if (!id) return '';
  return `<span class="hpu-puzzle__id" data-draggable data-drag-type="${dragTypes.id}">#${id}</span>`;
};


const renderClasses = (classList) => {
  if (!classList || !classList.length) return '';
  return classList
    .map(className => `<span class="hpu-puzzle__class" data-draggable data-drag-type="${dragTypes.class}">.${className}</span>`)
    .join('');
};


const renderAttributes = (attributes) => {
  if (!attributes || !Object.keys(attributes).length) return '';
  const joinedAttributes = Object.entries(attributes).map(renderAttribute).join(', ');
  return `(${joinedAttributes})`;
};


const renderAttribute = ([name, value]) => [
  `<span data-draggable data-drag-type="${dragTypes.attribute}">`,
  `<span class="hpu-puzzle__attribute-name">${name}</span>`,
  value ? `=<span class="hpu-puzzle__attribute-value" data-draggable data-drag-type="${dragTypes.attributeValue}">'${value}'</span>` : '',
  '</span>'
].join('');


const renderChildren = (children) => {
  // if (!children || !children.length) return '';
  return `<div class="hpu-puzzle__children">${renderWithoutLastInserter(children, true)}</div>`;
};


const renderText = (text) => `| <span class="hpu-puzzle__text">${text.text}</span>`;
