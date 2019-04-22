import { createDocumentFragment } from './utils.js';

export const createTemplateFactory = (htmlTemplate = '', selectors = {}) => {
  const container = document.createElement('div');
  container.innerHTML = htmlTemplate;
  const documentFragment = createDocumentFragment(Array.from(container.childNodes));

  return () => {
    const content = documentFragment.cloneNode(true);
    const nodes = Object.keys(selectors).reduce((nodes, name) => {
      nodes[name] = content.querySelector(selectors[name]);
      return nodes;
    }, {});
    return { content, nodes };
  };
};
