const getLevel = line => /[ ]*/.exec(line)[0].length / 2;
const parseText = line => ({ type: 'text', text: /\| (.*)/.exec(line)[1] });
const parseTag = (line) => {
  const [_, tagName, id, classes, attributes] = /[ ]*([^#.(]*)(#[^.(]*)?([^(]*)(.*)?/.exec(line); // :D
  return {
    type: 'element',
    tagName: tagName || 'div',
    id: id && id.substring(1),
    classList: classes && classes.split('.').slice(1) || [],
    attributes: attributes && attributes.slice(1, -1).split(', ')
      .map(attribute => attribute.split('=\''))
      .reduce((attributesMap, [name, value]) => ((attributesMap[name] = value && value.slice(0, -1)), attributesMap), {})
        || {},
    children: []
  };
};

const parse = (input) => {
  return input
    .trim()
    .split('\n')
    .reduce((childrenOnLevels, line) => {
      const level = getLevel(line);
      const isText = line[level * 2] === '|';
      const node = isText ? parseText(line) : parseTag(line);
      childrenOnLevels[level].push(node);
      if (!isText) childrenOnLevels[level + 1] = node.children;
      return childrenOnLevels;
    }, [[]])[0];
};

export { parse };
