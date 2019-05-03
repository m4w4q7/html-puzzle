import { Element } from '../model/element.js';
import { Text } from '../model/text.js';
import { BlockList } from '../model/block-list.js';
import { Attribute } from '../model/attribute.js';
import { getRandomElement, popRandomElement, random } from './random.js';

export const compose = ({ textContents, elementNames, ids, classes, attributeNames, attributeValues }) => {
  const { blockList, elements } = composeElements(elementNames);
  addTexts(blockList, elements, textContents);
  addIds(elements, ids);
  addClasses(elements, classes);
  addAttributes(elements, attributeNames, attributeValues);
  return blockList;
};


const composeElements = elementNames => {
  const elements = shuffleList(elementNames).map(name => new Element({ name }));
  const rootBlockList = new BlockList();
  elements.reduce(addElement, [rootBlockList]);
  return { elements, blockList: rootBlockList };
};


const addElement = (blockLists, element) => {
  addBlockAtRandomPosition(getRandomElement(blockLists), element);
  return [...blockLists, element.children];
};


const addTexts = (rootBlockList, elements, texts) => {
  const blockLists = [rootBlockList, ...elements.map(element => element.children)];
  texts.forEach(text => addBlockAtRandomPosition(getRandomElement(blockLists), new Text(text)));
};


const addIds = (elements, ids) => {
  const potentialHosts = [...elements];
  ids.forEach(id => popRandomElement(potentialHosts).id = id);
};


const addClasses = (elements, classes) => {
  const classGroups = createClassGroups(classes);

  Object.values(classGroups).forEach(classGroup => {
    const potentialHosts = [...elements];
    classGroup.forEach(className => popRandomElement(potentialHosts).classList.add(className));
  });
};


const addAttributes = (elements, attributeNames, attributeValues) => {
  const attributeGroups = createAttributeGroups(attributeNames, attributeValues);

  Object.entries(attributeGroups).forEach(([name, valueList]) => {
    const potentialHosts = [...elements];
    valueList.forEach(value => popRandomElement(potentialHosts).attributeList.add(new Attribute(name, value)));
  });
};


const shuffleList = input => {
  const list = [...input];
  const output = [];
  for (let i = 0; i < input.length; i++) {
    output.push(popRandomElement(list));
  }
  return output;
};


export const addBlockAtRandomPosition = (blockList, block) => blockList.add(block, random(blockList.length + 1));


const createClassGroups = classes => classes.reduce((classGroups, className) => {
  if (className in classGroups) {
    classGroups[className].push(className);
  } else {
    classGroups[className] = [className];
  }
  return classGroups;
}, {});


const createAttributeGroups = (names, values) => {
  const unusedValues = [...values];
  return names.reduce((attributeGroups, name) => {
    if (name in attributeGroups) {
      attributeGroups[name].push(popRandomElement(unusedValues));
    } else {
      attributeGroups[name] = [popRandomElement(unusedValues)];
    }
    return attributeGroups;
  }, {});
};
