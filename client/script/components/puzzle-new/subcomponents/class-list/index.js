import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';
import { ClassListRenderer } from './renderer.js';
import { highlightColors } from '../../enums.js';

export class PuzzleClassListComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._renderer = new ClassListRenderer(this);
    this._model = null;
    this._preview = null;
    this._previewColor = highlightColors.none;
  }

  static get createTemplate() {
    return createTemplate;
  }


  get model() {
    return this._model;
  }


  set model(model) {
    this._model = model.sort();
    this._render();
  }


  has(value) {
    return this._model.includes(value);
  }


  remove(value) {
    if (!this.has(value)) { return; }
    this._model = this._model.filter(className => className !== value);
    this._render();
    this.dispatchEvent(new CustomEvent('change'));
  }


  preview(value, highlightColor = highlightColors.none) {
    this._preview = value;
    this._previewColor = highlightColor;
    this._render();
  }


  cancelPreview() {
    if (this._preview === null) { return; }
    this._preview = null;
    this._previewColor = highlightColors.none;
    this._render();
  }


  applyPreview() {
    if (this._preview === null) { return; }

    if (!this.has(this._preview)) { this._model.splice(this._getIndex(this._preview), 0, this._preview); }
    this.cancelPreview();
    this.dispatchEvent(new CustomEvent('change'));
  }


  _getIndex(value) {
    const index = this._model.findIndex(className => className >= value);
    return index === -1 ? this._model.length : index;
  }


  _render() {
    if (!this._nodes || !this._model) { return; }
    this._nodes = this._renderer.render(this._nodes, {
      model: this._model,
      preview: this._preview,
      previewColor: this._previewColor
    });
  }

}
