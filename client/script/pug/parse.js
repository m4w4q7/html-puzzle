/* eslint-disable no-unused-vars */
import { groupedTextLine, groupedElementLine, groupedAttribute } from './patterns.js';
import { BlockList } from '../model/block-list.js';
import { Text } from '../model/text.js';
import { Element } from '../model/element.js';
import { ClassList } from '../model/class-list.js';
import { AttributeList } from '../model/attribute-list.js';
import { Attribute } from '../model/attribute.js';
import { matchAll } from '../utils.js';
import { PugParseError } from '../errors/pug-parse-error.js';

export const parse = (input) => {
  const errors = [];
  const blockList = input
    .trim()
    .split('\n')
    .map(parseBlock(errors))
    .filter(block => block)
    .reduce(buildTree, [new BlockList()])[0];
  return { blockList, errors };
};


const parseBlock = (errors) => (line, index) => {
  if (!line) { return; }
  const block = (parseTextLine(line) || parseElementLine(line));
  if (!block) { errors.push(new PugParseError(line, index + 1)); }
  return block;
};


const parseTextLine = line => {
  const result = textLineRegexp.exec(line);
  if (!result) { return; }
  const [_, leadingSpaces, text] = result;
  return {
    level: parseIndentation(leadingSpaces),
    block: new Text(parseText(text))
  };
};


const parseElementLine = line => {
  const result = elementLineRegexp.exec(line);
  if (!result) { return; }
  const [_, leadingSpaces, name, id, classes, attributes] = result;
  return {
    level: parseIndentation(leadingSpaces),
    block: new Element({
      name: parseTagName(name),
      id: parseId(id),
      classList: parseClasses(classes),
      attributeList: parseAttributes(attributes)
    })
  };
};


const parseIndentation = leadingSpaces => leadingSpaces.length / 2;

const parseText = text => text.slice(2);

const parseTagName = name => name || 'div';

const parseId = id => id && id.slice(1);

const parseClasses = classes => new ClassList(classes.split('.').slice(1));

const parseAttributes = attributes => {
  const matches = [...matchAll(attributes, new RegExp(groupedAttribute, 'g'))];
  attributes = matches.map(([_, name, value = '']) => new Attribute(name, unescapeAttributeValue(value)));
  return new AttributeList(attributes);
};


const buildTree = (currentBlockListsPerLevel, { level, block }) => {
  currentBlockListsPerLevel[level].add(block);
  if (block instanceof Element) { currentBlockListsPerLevel[level + 1] = block.children; }
  return currentBlockListsPerLevel;
};

const textLineRegexp = new RegExp(groupedTextLine);

const elementLineRegexp = new RegExp(groupedElementLine);

const unescapeAttributeValue = value => value.replace(/\\\\/g, '\\').replace(/\\'/g, `'`);
