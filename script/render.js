const renderTagName = (tagName) => {
  return `<span class="ths-puzzle__tag-name">${tagName}</span>`;
}


const renderId = (id) => {
  if (!id) return '';
  return `<span class="ths-puzzle__id" data-draggable>#${id}</span>`;
}


const renderClasses = (classList) => {
  if (!classList || !classList.length) return '';
  return classList
    .map(className => `<span class="ths-puzzle__class" data-draggable>.${className}</span>`)
    .join('');
}


const renderAttributes = (attributes) => {
  if (!attributes || !Object.keys(attributes).length) return '';
  const joinedAttributes = Object.entries(attributes).map(renderAttribute).join(', ');
  return `(${joinedAttributes})`;
}

const renderAttribute = ([name, value]) => [
  '<span data-draggable>',
  `<span class="ths-puzzle__attribute-name">${name}</span>`,
  value ? `=<span class="ths-puzzle__attribute-value" data-draggable>'${value}'</span>` : '',
  '</span>'
].join('');


const renderChildren = (children) => {
  if (!children || !children.length) return '';
  return `<div class="ths-puzzle__children">${render(children)}</div>`
}


const renderElement = (element) => {
  return [
    '<div class="ths-puzzle__block" data-draggable>',
    renderTagName(element.tagName),
    renderId(element.id),
    renderClasses(element.classList),
    renderAttributes(element.attributes),
    renderChildren(element.children),
    '</div>'
  ].join('');
}


const renderText = (text) => {
  return [
    '<div class="ths-puzzle__block" data-draggable>',
    `| <span class="ths-puzzle__text">${text.text}</span>`,
    '</div>'
  ].join('')
}


const render = (domModel) => {
  if (Array.isArray(domModel)) return domModel.map(render).join('\n');
  return domModel.type === 'element' ? renderElement(domModel) : renderText(domModel);
}


export { render };
