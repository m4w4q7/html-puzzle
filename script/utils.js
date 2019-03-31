export const createElement = (name, properties, children) => {
  const element = document.createElement(name);
  Object.assign(element, properties);
  if (children) { children.forEach(child => element.appendChild(child)); }
  return element;
};


export const fetchText = url => fetch(url).then(response => response.text());
