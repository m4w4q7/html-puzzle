import { selectors } from './dom-identifiers.js';


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
