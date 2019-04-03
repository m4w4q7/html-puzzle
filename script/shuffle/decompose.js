export const decompose = input => {
  const blocks = flattenBlocks(input);
  const texts = blocks.filter(({ type }) => type === 'text').map(({ text }) => text);
  const elements = blocks.filter(block => block.type === 'element');
  const tags = elements.map(({ tagName }) => tagName);
  const ids = elements.filter(({ id }) => id).map(({ id }) => id);
  const classes = elements.reduce((classes, element) => classes.concat(element.classList), []);
  const attributes = elements.reduce((attributes, element) => attributes.concat(element.attributes), []);
  const attributeNames = attributes.map(([name]) => name);
  const attributeValues = attributes.map(([_, value]) => value);

  return { texts, tags, ids, classes, attributeNames, attributeValues };
};


const flattenBlocks = model => model.reduce((flatBlocks, block) => {
  flatBlocks.push(block);
  if (block.type === 'element') { flatBlocks.push(...flattenBlocks(block.children)); }
  return flatBlocks;
}, []);
