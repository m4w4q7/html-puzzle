import { Element } from '../model/element.js';

export const render = blockList => blockList.list().map(renderBlock).join('');


const renderBlock = block => block instanceof Element ? renderElement(block) : renderText(block);


const renderElement = (element) => {
  return `<${element.name}${renderAttributes(element)}>${render(element.children)}</${element.name}>`;
};


const renderAttributes = (element) => {
  const allAttributes = element.attributeList.list().map(attribute => [attribute.name, attribute.value]);
  if (element.id) { allAttributes.push(['id', element.id]); }
  if (!element.classList.isEmpty()) { allAttributes.push(['class', element.classList.list().join(' ')]); }
  return allAttributes.map(([name, value]) => ` ${name}="${escapeAttributeValue(value)}"`).join('');
};


const renderText = text => escapeText(text.content);


const escapeAttributeValue = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');


const escapeText = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
