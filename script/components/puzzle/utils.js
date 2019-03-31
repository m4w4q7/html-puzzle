export const forceBetweenBoundaries = (value, min, max) => Math.min(Math.max(value, min), max);


export const doOnNext = (element, eventName, callback) => {
  const unsubscribingCallback = event => {
    element.removeEventListener(eventName, unsubscribingCallback);
    callback(event);
  };
  element.addEventListener(eventName, unsubscribingCallback);
  const cancel = () => element.removeEventListener(eventName, unsubscribingCallback);
  return cancel;
};


export const reflow = element => void element.clientWidth;


export const findAncestor = (element, container, callback) => {
  let currentElement = element;
  while (currentElement !== container && !callback(currentElement)) {
    currentElement = currentElement.parentElement;
  }
  return currentElement === container ? null : currentElement;
};


export const getDragType = element => element.getAttribute('data-drag-type');


export const getChildrenWithClass = (element, className) => {
  return Array.from(element.children).filter(child => child.classList.contains(className));
};


export const queryAll = (container, selector) => Array.from(container.querySelectorAll(selector));


export const queryDifference = (container, containerToIgnore, selector) => {
  const matchingElements = Array.from(container.querySelectorAll(selector));
  const blacklist = Array.from(containerToIgnore.querySelectorAll(selector));
  if (containerToIgnore.matches(selector)) { blacklist.push(containerToIgnore); }
  return getListDifference(matchingElements, blacklist);
};


const getListDifference = (list, blacklist) => list.filter(item => !blacklist.includes(item));

