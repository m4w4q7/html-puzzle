import { pieceTypes } from '../../enums.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';
import { createTemplate } from './template.js';
import { highlightColors } from '../../enums.js';

export class PuzzleAttributeComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._model = null;
    this._preview = null;
    this._previewColor =
    this.parentList = null;
  }


  get pieceType() {
    return pieceTypes.attribute;
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


  preview(model, highlightColor = highlightColors.none) {
    this._preview = model;
    this._previewColor = highlightColor;
    this._render();
  }


  cancelPreview() {
    if (this._preview === null) { return; }
    this._preview = null;
    this._previewColor = highlightColors.none;
    this._render();
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
