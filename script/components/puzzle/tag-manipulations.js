import { selectors, classes } from './dom-identifiers.js';
import { createElement } from './utils.js';


export const addClass = (tag, piece) => {
  const line = tag.querySelector(selectors.line);
  const classes = [...line.querySelectorAll(selectors.class)];
  const textOfPiece = piece.textContent;
  const nextClassIndex = classes.findIndex(classElement => classElement.textContent > textOfPiece);
  const previousClass = nextClassIndex > -1 ? classes[nextClassIndex - 1] : classes[classes.length - 1];

  const previousElement = previousClass || line.querySelector(selectors.id) || line.querySelector(selectors.tagName);

  previousElement.insertAdjacentElement('afterend', piece);
};


export const addId = (tag, piece) => tag.querySelector(selectors.tagName).insertAdjacentElement('afterend', piece);


export const getId = tag => tag.querySelector(selectors.line).querySelector(selectors.id);


export const addAttribute = (tag, piece) => {
  const line = tag.querySelector(selectors.line);
  const attributes = [...line.querySelectorAll(selectors.attribute)];

  if (!attributes.length) {
    line.appendChild(createAttributes(piece));
  } else {
    const textOfPiece = piece.textContent;
    const nextAttribute = attributes.find(attribute => attribute.textContent > textOfPiece);

    if (nextAttribute) {
      nextAttribute.parentElement.insertBefore(createFragment([piece, createAttributeSeparator()]), nextAttribute);
    } else {
      const attributesElement = line.querySelector(selectors.attributes);
      attributesElement.insertBefore(createFragment([createAttributeSeparator(), piece]), attributesElement.lastChild);
    }
  }
};


export const removeAttribute = (piece) => {
  if (piece.nextElementSibling) {
    piece.nextElementSibling.remove();
    piece.remove();
  } else if (piece.previousElementSibling) {
    piece.previousElementSibling.remove();
    piece.remove();
  } else {
    piece.parentElement.remove();
  }
};


const createAttributes = piece => createElement('span', { className: classes.attributes }, [
  createText('('),
  piece,
  createText(')')
]);


const createFragment = children => children.reduce((fragment, child) => {
  fragment.appendChild(child);
  return fragment;
}, document.createDocumentFragment());


const createAttributeSeparator = () => createElement('span', { className: classes.attributeSeparator }, [
  createText(', ')
]);


const createText = content => document.createTextNode(content);
