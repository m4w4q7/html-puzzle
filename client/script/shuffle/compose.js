import { getRandomElement, pushElementRandomly, popRandomElement } from './random.js';

export const compose = ({ texts, tags, ids, classes, attributeNames, attributeValues }) => {
  const { model, elements } = composeElements(tags);
  addTexts(model, elements, texts);
  addIds(elements, ids);
  addClasses(elements, classes);
  addAttributes(elements, attributeNames, attributeValues);
  return model;
};


const composeElements = tags => {
  const elements = shuffleList(tags).map(createEmptyElement);
  const model = [];
  elements.reduce(addElement, [model]);
  return { elements, model };
};


const addElement = (childrenList, element) => {
  pushElementRandomly(getRandomElement(childrenList), element);
  return [...childrenList, element.children];
};


const addTexts = (rootChildren, elements, texts) => {
  const childrenList = [rootChildren, ...elements.map(({ children }) => children)];
  texts.forEach(text => pushElementRandomly(getRandomElement(childrenList), createText(text)));
};


const addIds = (elements, ids) => {
  const potentialHosts = [...elements];
  ids.forEach(id => popRandomElement(potentialHosts).id = id);
};


const addClasses = (elements, classes) => {
  classes.forEach(className => getRandomElement(elements).classList.push(className));
};


const addAttributes = (elements, attributeNames, attributeValues) => {
  const attributeGroups = createAttributeGroups(attributeNames, attributeValues);

  Object.entries(attributeGroups).forEach(([name, valueList]) => {
    const potentialHosts = [...elements];
    valueList.forEach(value => popRandomElement(potentialHosts).attributes.push([name, value]));
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


const createEmptyElement = tagName => ({ type: 'element', tagName, id: undefined, classList: [], attributes: [], children: [] });

const createText = text => ({ type: 'text', text });
