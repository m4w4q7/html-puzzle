import { PieceTypes } from '../../enums/piece-types.js';

export const reflow = element => void element.clientWidth;

export const findAncestor = (element, callback, container = document.body) => {
  let currentElement = element;
  while (currentElement !== container && !callback(currentElement)) {
    currentElement = currentElement.parentElement;
  }
  return currentElement === container ? null : currentElement;
};

export const isBlock = element => !!element &&
  (element.pieceType === PieceTypes.ELEMENT || element.pieceType === PieceTypes.TEXT);

export const getListDifference = (list, blacklist) => list.filter(item => !blacklist.includes(item));
