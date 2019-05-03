import { PieceTypes } from '../../../../enums/piece-types.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';

export class PuzzleAttributeValueComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this.parentAttribute = null;
    this._value = null;
  }


  get pieceType() {
    return PieceTypes.ATTRIBUTE_VALUE;
  }


  get value() {
    return this._value;
  }


  set value(value) {
    this._value = value;
    this.textContent = value ? `'${this._escapeValue(value)}'` : '';
  }


  _escapeValue(value) {
    return value.replace('\\', '\\\\').replace(`'`, `\\'`);
  }

}
