import { PieceTypes } from '../../enums.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';

export class PuzzleTextComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._model = null;
    this.indentation = null;
    this.parentList = null;
  }


  get pieceType() {
    return PieceTypes.TEXT;
  }


  get model() {
    return this._model;
  }


  set model(value) {
    this._model = value;
    this.textContent = `| ${value.content}`;
  }


  getContainedBlocks() {
    return [this];
  }

}
