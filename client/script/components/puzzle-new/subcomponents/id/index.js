import { pieceTypes } from '../../enums.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';
import { createTemplate } from './template.js';

export class PuzzleIdComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._value = null;
  }


  get pieceType() {
    return pieceTypes.id;
  }


  set value(value) {
    this._value = value;
    this.textContent = value ? `#${value}` : '';
  }


  static get createTemplate() {
    return createTemplate;
  }

}
