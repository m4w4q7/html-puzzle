import { pieceTypes } from '../../enums.js';
import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';
import { createTemplate } from './template.js';

export class PuzzleAttributeComponent extends AbstractPuzzlePiece {

  constructor() {
    super();
    this._name = null;
    this._value = null;
  }


  get pieceType() {
    return pieceTypes.attribute;
  }


  set name(value) {
    this._name = value;
    this._render();
  }


  set value(value) {
    this._value = value;
    this._render();
  }


  static get createTemplate() {
    return createTemplate;
  }


  _render() {
    if (!this._nodes || this._name === null || this._value === null) { return; }
    this._nodes.name.textContent = this._name;
    this._nodes.valueContainer.style.display = this._value ? '' : 'none';
    this._nodes.value.value = this._value;
  }

}
