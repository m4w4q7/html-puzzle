import { pieceTypes } from '../../enums.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';

export class PuzzleClassComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._value = null;
  }


  get pieceType() {
    return pieceTypes.class;
  }


  set value(value) {
    this._value = value;
    this.textContent = value ? `.${value}` : '';
  }

}
