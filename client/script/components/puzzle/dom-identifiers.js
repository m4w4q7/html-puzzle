import { dragTypes } from './enums.js';

export const classes = {
  block: 'hpu-puzzle__block',
  line: 'hpu-puzzle__line',
  tagName: 'hpu-puzzle__tag-name',
  id: 'hpu-puzzle__id',
  class: 'hpu-puzzle__class',
  attributes: 'hpu-puzzle__attributes',
  attributeName: 'hpu-puzzle__attribute-name',
  attributeValue: 'hpu-puzzle__attribute-value',
  attributeSeparator: 'hpu-puzzle__attribute-separator',
  attribteTarget: 'hpu-puzzle__attribute-target',
  children: 'hpu-puzzle__children',
  text: 'hpu-puzzle__text',
};

export const selectors = {
  block: `.${classes.block}`,
  line: `.${classes.line}`,
  tagName: `.${classes.tagName}`,
  id: `.${classes.id}`,
  class: `.${classes.class}`,
  attributes: `.${classes.attributes}`,
  attributeName: `.${classes.attributeName}`,
  attributeValue: `.${classes.attributeValue}`,
  attributeSeparator: `.${classes.attributeSeparator}`,
  attribteTarget: `.${classes.attributeTarget}`,
  children: `.${classes.children}`,
  text: `.${classes.text}`,

  attribute: `[data-drag-type="${dragTypes.attribute}"]`,
};
