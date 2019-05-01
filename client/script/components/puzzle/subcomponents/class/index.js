import { pieceTypes } from '../../enums.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';

export class PuzzleClassComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._value = null;
    this.parentList = null;
  }


  get pieceType() {
    return pieceTypes.class;
  }


  get value() {
    return this._value;
  }


  set value(value) {
    this._value = value;
    this.textContent = value ? `.${value}` : '';
  }

}
