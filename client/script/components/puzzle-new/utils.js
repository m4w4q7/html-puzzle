import { pieceTypes } from './enums.js';

export const reflow = element => void element.clientWidth;

export const findAncestor = (element, container, callback) => {
  let currentElement = element;
  while (currentElement !== container && !callback(currentElement)) {
    currentElement = currentElement.parentElement;
  }
  return currentElement === container ? null : currentElement;
};

export const isBlock = element => !!element &&
  (element.pieceType === pieceTypes.element || element.pieceType === pieceTypes.text);
