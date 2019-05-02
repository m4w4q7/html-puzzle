import { PieceTypes } from './enums.js';

export const reflow = element => void element.clientWidth;

export const findAncestor = (element, container, callback) => {
  let currentElement = element;
  while (currentElement !== container && !callback(currentElement)) {
    currentElement = currentElement.parentElement;
  }
  return currentElement === container ? null : currentElement;
};

export const isBlock = element => !!element &&
  (element.pieceType === PieceTypes.ELEMENT || element.pieceType === PieceTypes.TEXT);

export const getListDifference = (list, blacklist) => list.filter(item => !blacklist.includes(item));
