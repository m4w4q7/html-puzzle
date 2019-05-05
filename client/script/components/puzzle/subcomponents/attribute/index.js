import { HighlightColors } from '../../enums.js';
import { PieceTypes } from '../../../../enums/piece-types.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';
import { createTemplate } from './template.js';
import { findAncestor } from '../../utils.js';
import { PuzzleAttributeValueComponent } from '../attribute-value/index.js';

export class PuzzleAttributeComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._model = null;
    this._preview = null;
    this._previewColor = HighlightColors.NONE;
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


  get elementHost() {
    return findAncestor(this, node => node.pieceType === PieceTypes.ELEMENT);
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
    this._model = this._model.clone({ value });
    this._render();
    this._emitChange();
  }


  _emitChange() {
    this.dispatchEvent(new CustomEvent('change'));
  }


  _render() {
    if (!this._nodes || !(this._model || this._preview)) { return; }
    const model = this._preview || this._model;
    this._nodes.name.textContent = model.name;
    this._nodes.valueContainer.style.display = model.value ? '' : 'none';
    this._nodes.value.value = model.value;
    this.highlight(this._previewColor);
  }


  static get dependencies() {
    return [PuzzleAttributeValueComponent];
  }


  static get tagName() {
    return 'hpu-puzzle-attribute';
  }

}
