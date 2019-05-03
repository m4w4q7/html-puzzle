import { Element } from '../model/element.js';
import { Text } from '../model/text.js';

export const decompose = (blockList) => {
  const blocks = blockList.listDeep();
  const textContents = blocks.filter(block => block instanceof Text).map(text => text.content);
  const elements = blocks.filter(block => block instanceof Element);
  const elementNames = elements.map(element => element.name);
  const ids = elements.filter(element => element.id).map(element => element.id);
  const classes = elements.flatMap(element => element.classList.list());
  const attributes = elements.flatMap(element => element.attributeList.list());
  const attributeNames = attributes.map(attribute => attribute.name);
  const attributeValues = attributes.map(attribute => attribute.value);

  return { textContents, elementNames, ids, classes, attributeNames, attributeValues };
};
