import { PieceTypes, HighlightColors } from '../../enums.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';

export class PuzzleIdComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._value = null;
    this._preview = null;
  }


  get pieceType() {
    return PieceTypes.ID;
  }


  get value() {
    return this._value;
  }


  set value(value) {
    this._value = value;
    this._render();
  }


  preview(value, highlightColor = HighlightColors.NONE) {
    this._preview = value;
    this._render();
    this.highlight(highlightColor);
  }


  cancelPreview() {
    this._preview = null;
    this._render();
    this.highlight(HighlightColors.NONE);
  }


  applyPreview() {
    if (this._preview === null) { return; }
    this._value = this._preview;
    this.cancelPreview();
    this.dispatchEvent(new CustomEvent('change'));
  }


  _render() {
    const value = this._preview === null ? this._value : this._preview;
    this.textContent = value ? `#${value}` : '';
  }

}
