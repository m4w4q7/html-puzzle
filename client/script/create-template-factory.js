import { createDocumentFragment } from './utils.js';

export const createTemplateFactory = (htmlTemplate = '', factories = {}) => {
  const container = document.createElement('div');
  container.innerHTML = htmlTemplate;
  const documentFragment = createDocumentFragment(Array.from(container.childNodes));

  return () => {
    const content = documentFragment.cloneNode(true);
    const nodes = Object.keys(factories).reduce((nodes, name) => {
      nodes[name] = typeof factories[name] === 'string' ?
        content.querySelector(factories[name]) :
        factories[name](content);
      return nodes;
    }, {});
    return { content, nodes };
  };
};
