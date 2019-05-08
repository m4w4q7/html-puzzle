export const createTemplateFactory = (htmlTemplate = '', factories = {}, locals = {}) => {
  const container = document.createElement('template');
  container.innerHTML = typeof htmlTemplate === 'function' ? htmlTemplate(locals) : htmlTemplate;

  return () => {
    const content = container.content.cloneNode(true);
    const nodes = createNodes(content, factories);
    return { content, nodes };
  };
};


const createNodes = (content, factories) => Object.keys(factories).reduce((nodes, name) => {
  const factory = factories[name];
  if (typeof factory === 'string') {
    nodes[name] = content.querySelector(factory);
  } else if (typeof factory === 'function') {
    nodes[name] = factory(content);
  } else if (typeof factory === 'object') {
    nodes[name] = createNodes(content, factory);
  }
  return nodes;
}, {});
