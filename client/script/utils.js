export const minMax = (value, min, max) => Math.min(Math.max(value, min), max);


export const createElement = (name, properties, children) => {
  const element = document.createElement(name);
  Object.assign(element, properties);
  if (children) { children.forEach(child => element.appendChild(child)); }
  return element;
};


export const createDocumentFragment = (children = []) => {
  const documentFragment = document.createDocumentFragment();
  children.forEach(child => documentFragment.appendChild(child));
  return documentFragment;
};


export const clearElement = (element) => {
  const newElement = element.cloneNode(false);
  element.insertAdjacentElement('afterend', newElement);
  element.remove();
  return newElement;
};


export const getLast = list => list[list.length - 1];


export const doOnNext = (element, eventName, callback, { predicate } = {}) => {
  const unsubscribingCallback = event => {
    if (predicate && !predicate(event)) { return; }
    element.removeEventListener(eventName, unsubscribingCallback);
    callback(event);
  };
  element.addEventListener(eventName, unsubscribingCallback);
  const cancel = () => element.removeEventListener(eventName, unsubscribingCallback);
  return cancel;
};


export const get = (path, object) => path.reduce((currentLevel, key) => {
  return (currentLevel && typeof currentLevel === 'object') ? currentLevel[key] : undefined;
}, object);


export const isEqualArray = (array1, array2, comparator) => array1.length === array2.length &&
  array1.every((element, index) => comparator ? comparator(element, array2[index]) : element === array2[index]);


export const matchAll = function* (input, pattern) {
  let match;
  // eslint-disable-next-line no-cond-assign
  while (match = pattern.exec(input)) { yield match; }
};
