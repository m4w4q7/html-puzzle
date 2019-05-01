import { pieceTypes } from '../../enums.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';

export class PuzzleAttributeValueComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this.parentAttribute = null;
    this._value = null;
  }


  get pieceType() {
    return pieceTypes.attributeValue;
  }


  get value() {
    return this._value;
  }


  set value(value) {
    this._value = value;
    this.textContent = value ? `'${value}'` : '';
  }

}
