import { dragTypes } from './enums.js';
import { getDragType } from './utils.js';
import { selectors } from './dom-identifiers.js';


export const moveInlinePiece = (piece, tag) => {
  if (getDragType(piece) === dragTypes.class) {
    moveClass(piece, tag);
  }
};


const moveClass = (piece, tag) => {
  const line = tag.querySelector(selectors.line);
  const classes = [...line.querySelectorAll(selectors.class)];
  const textOfPiece = piece.textContent;
  const nextClassIndex = classes.findIndex(classElement => classElement.textContent > textOfPiece);
  const previousClass = nextClassIndex > -1 ? classes[nextClassIndex - 1] : classes[classes.length - 1];

  const previousElement = previousClass || line.querySelector(selectors.id) || line.querySelector(selectors.tagName);

  previousElement.insertAdjacentElement('afterend', piece);
};
