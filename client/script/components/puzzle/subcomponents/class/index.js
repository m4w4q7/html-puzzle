import { PieceTypes } from '../../../../enums/piece-types.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';
import { findAncestor } from '../../utils.js';

export class PuzzleClassComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._value = null;
    this.parentList = null;
  }


  get pieceType() {
    return PieceTypes.CLASS;
  }


  get value() {
    return this._value;
  }


  set value(value) {
    this._value = value;
    this.textContent = value ? `.${value}` : '';
  }


  get elementHost() {
    return findAncestor(this, node => node.pieceType === PieceTypes.ELEMENT);
  }


  static get tagName() {
    return 'hpu-puzzle-class';
  }

}
