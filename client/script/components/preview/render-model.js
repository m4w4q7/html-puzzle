export const renderModel = blocks => blocks.map(renderBlock).join('');


const renderBlock = block => block.type === 'element' ? renderElement(block) : renderText(block);


const renderElement = ({ tagName, id, classList, attributes, children }) => {
  return `<${tagName} ${renderAttributes({ id, classList, attributes })}>${renderModel(children)}</${tagName}>`;
};


const renderAttributes = ({ id, classList, attributes }) => {
  const allAttributes = [...attributes];
  if (id) { allAttributes.push(['id', id]); }
  if (classList.length) { allAttributes.push(['class', classList.join(' ')]); }
  return allAttributes.map(([name, value]) => `${name}="${value}"`).join(' ');
};


const renderText = ({ text }) => escapeText(text);


const escapeText = text => text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');