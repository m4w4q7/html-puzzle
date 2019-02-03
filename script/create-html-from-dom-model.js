const renderTagName = (tagName) => {
  return tagName;
}


const renderId = (id) => {
  if (!id) return '';
  return `#${id}`;
}


const renderClasses = (classList) => {
  if (!classList || !classList.length) return '';
  return classList
    .map(className => `.${className}`)
    .join('');
}


const renderAttributes = (attributes) => {
  if (!attributes || !Object.keys(attributes).length) return '';
  const joinedAttributes = Object.entries(attributes)
    .map(([name, value]) => `${name}='${value}'`)
    .join(', ');
  return `(${joinedAttributes})`;
}


const createHtmlFromDomModel = (domModel) => {
  if (Array.isArray(domModel)) return domModel.map(createHtmlFromDomModel).join('\n');

  return renderTagName(domModel.tagName) +
    renderId(domModel.id) +
    renderClasses(domModel.classList) +
    renderAttributes(domModel.attributes);
}


export { createHtmlFromDomModel };
