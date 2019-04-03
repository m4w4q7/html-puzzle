import { classes, selectors } from './dom-identifiers.js';
import { dragTypes } from './enums.js';
import { getChildrenWithClass, queryAll } from './utils.js';


export const createModelFromDom = (container) => {
  return getChildrenWithClass(container, classes.block).map(readBlock);
};


const readBlock = (block) => {
  return block.getAttribute('data-drag-type') === dragTypes.element ? readElement(block) : readText(block);
};


const readElement = (element) => {
  const [line] = getChildrenWithClass(element, classes.line);
  const [children] = getChildrenWithClass(element, classes.children);

  return {
    type: 'element',
    tagName: readTagName(line),
    id: readId(line),
    classList: readClassList(line),
    attributes: readAttributes(line),
    children: createModelFromDom(children)
  };
};


const readTagName = line => line.querySelector(selectors.tagName).textContent;


const readId = (line) => {
  const [element] = line.querySelectorAll(selectors.id);
  return element && element.textContent.slice(1);
};


const readClassList = (line) => getChildrenWithClass(line, classes.class).map(element => element.textContent.slice(1));


const readAttributes = (line) => queryAll(line, selectors.attribute).map((attribute) => {
  const name = attribute.querySelector(selectors.attributeName).textContent;
  const valueElement = attribute.querySelector(selectors.attributeValue);
  const value = valueElement ? valueElement.textContent.slice(1, -1) : '';
  return [name, value];
});


const readText = (element) => ({ type: 'text', text: element.querySelector(selectors.text).textContent });
