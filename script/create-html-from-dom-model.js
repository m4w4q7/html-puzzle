const renderTagName = (tagName) => {
  return `<span class="ths-puzzle__tag-name">${tagName}</span>`;
}


const renderId = (id) => {
  if (!id) return '';
  return `<span class="ths-puzzle__id">#${id}</span>`;
}


const renderClasses = (classList) => {
  if (!classList || !classList.length) return '';
  return classList
    .map(className => `<span class="ths-puzzle__class">.${className}</span>`)
    .join('');
}


const renderAttributes = (attributes) => {
  if (!attributes || !Object.keys(attributes).length) return '';
  const joinedAttributes = Object.entries(attributes)
    .map(([name, value]) => `<span class="ths-puzzle__attribute-name">${name}</span>=<span class="ths-puzzle__attribute-value">'${value}'</span>`)
    .join(', ');
  return `(${joinedAttributes})`;
}


const renderChildren = (children) => {
  if (!children || !children.length) return '';
  return `<div class="ths-puzzle__children">${createHtmlFromDomModel(children)}</div>`
}


const renderElement = (element) => {
  return [
    '<div class="ths-puzzle__block">',
    renderTagName(element.tagName),
    renderId(element.id),
    renderClasses(element.classList),
    renderAttributes(element.attributes),
    renderChildren(element.children),
    '</div>'
  ].join('');
}


const renderText = (text) => {
  return `| <span class="ths-puzzle__text">${text.text}</span>`;
}


const createHtmlFromDomModel = (domModel) => {
  if (Array.isArray(domModel)) return domModel.map(createHtmlFromDomModel).join('\n');
  return domModel.type === 'element' ? renderElement(domModel) : renderText(domModel);
}


export { createHtmlFromDomModel };
