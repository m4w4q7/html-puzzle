import { PieceTypes } from '../../enums.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';
import { createTemplate } from './template.js';
import { HighlightColors } from '../../enums.js';

export class PuzzleAttributeComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._model = null;
    this._preview = null;
    this._previewColor =
    this.parentList = null;
  }


  get pieceType() {
    return PieceTypes.ATTRIBUTE;
  }


  get valueComponent() {
    return this._nodes && this._nodes.value;
  }


  get model() {
    return this._model;
  }


  set model(value) {
    this._model = value;
    this._render();
  }


  static get createTemplate() {
    return createTemplate;
  }


  connectedCallback() {
    if (!super.connectedCallback()) { return; }
    this._nodes.value.parentAttribute = this;
  }


  preview(model, highlightColor = HighlightColors.NONE) {
    this._preview = model;
    this._previewColor = highlightColor;
    this._render();
  }


  cancelPreview() {
    if (this._preview === null) { return; }
    this._preview = null;
    this._previewColor = HighlightColors.NONE;
    this._render();
  }


  applyValue(value) {
    this._model = [this._model[0], value];
    this._render();
    this._emitChange();
  }


  _emitChange() {
    this.dispatchEvent(new CustomEvent('change'));
  }


  _render() {
    if (!this._nodes || !(this._model || this._preview)) { return; }
    const [name, value] = this._preview || this._model;
    this._nodes.name.textContent = name;
    this._nodes.valueContainer.style.display = value ? '' : 'none';
    this._nodes.value.value = value;
    this.highlight(this._previewColor);
  }

}
