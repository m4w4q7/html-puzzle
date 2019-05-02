const indentation = `  `;
const indentations = `(?:${indentation})*`;

const text = `\\| .*`;

const tagName = `[0-9a-zA-Z-]*`;

const idName = `[_0-9a-zA-Z-]+`;
const idSelector = `#${idName}`;
const id = `(?:${idSelector})?`;

const className = `[_0-9a-zA-Z-]+`;
const classSelector = `\\.${className}`;
const classes = `(?:${classSelector})*`;

const attributeName = `[_0-9a-zA-Z-]+`;

const backslash = `\\\\`;
const escapedBackslash = `${backslash}${backslash}`;
const escapedApostrophe = `${backslash}'`;
const unescapedAttributeValueCharacter = `[^${backslash}'\\n]`;
const attributeValue = `(?:(?:${escapedBackslash})|(?:${escapedApostrophe})|${unescapedAttributeValueCharacter})*`;

const attribute = `${attributeName}(?:='${attributeValue}')?`;

const attributeSeparator = `[ ]*,[ ]*`;
const separatedAttributes = `${attribute}(?:${attributeSeparator}${attribute})*`;
const attributes = `(?:\\([ ]*${separatedAttributes}[ ]*\\))?`;

export const groupedTextLine = `^(${indentations})(${text})$`;
export const groupedElementLine = `^(${indentations})(${tagName})(${id})(${classes})(${attributes})$`;
export const groupedAttribute = `(${attributeName})(?:='(${attributeValue})')?`;
