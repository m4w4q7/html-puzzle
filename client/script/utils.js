export const minMax = (value, min, max) => Math.min(Math.max(value, min), max);


export const createElement = (name, properties, children) => {
  const element = document.createElement(name);
  Object.assign(element, properties);
  if (children) { children.forEach(child => element.appendChild(child)); }
  return element;
};


export const fetchText = url => fetch(url).then(response => response.text());


export const doOnNext = (element, eventName, callback) => {
  const unsubscribingCallback = event => {
    element.removeEventListener(eventName, unsubscribingCallback);
    callback(event);
  };
  element.addEventListener(eventName, unsubscribingCallback);
  const cancel = () => element.removeEventListener(eventName, unsubscribingCallback);
  return cancel;
};


export const pick = (properties, object) => properties.reduce((result, property) => {
  if (property in object) { result[property] = object[property]; }
  return result;
}, {});
