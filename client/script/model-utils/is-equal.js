export const isEqual = (modelA, modelB) => {
  return JSON.stringify(normalizeModel(modelA)) === JSON.stringify(normalizeModel(modelB));
};


const normalizeModel = (model) => {
  return model.map(block => block.type === 'element' ? normalizeElement(block) : normalizeText(block));
};


const normalizeElement = (element) => ({
  type: 'element',
  tagName: element.tagName,
  id: element.id,
  classList: [...element.classList].sort(),
  attributes: [...element.attributes].sort(compareAttributes),
  children: normalizeModel(element.children)
});


const normalizeText = ({ type, text }) => ({ type, text });


const compareAttributes = ([name1, value1], [name2, value2]) => {
  if (name1 < name2) { return -1; }
  if (name1 > name2) { return 1; }
  if (value1 < value2) { return -1; }
  if (value1 > value2) { return 1; }
  return 0;
};