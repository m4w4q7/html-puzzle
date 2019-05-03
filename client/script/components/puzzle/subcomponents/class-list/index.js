import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';
import { ClassListRenderer } from './renderer.js';
import { HighlightColors } from '../../enums.js';

export class PuzzleClassListComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._renderer = new ClassListRenderer(this);
    this._model = null;
    this._preview = null;
    this._previewColor = HighlightColors.NONE;
  }

  static get createTemplate() {
    return createTemplate;
  }


  get model() {
    return this._model;
  }


  set model(model) {
    this._model = model;
    this._render();
  }


  has(value) {
    return this._model.has(value);
  }


  remove(value) {
    if (!this.has(value)) { return; }
    this._model.remove(value);
    this._render();
  }


  preview(value, highlightColor = HighlightColors.NONE) {
    this._preview = value;
    this._previewColor = highlightColor;
    this._render();
  }


  cancelPreview() {
    if (this._preview === null) { return; }
    this._preview = null;
    this._previewColor = HighlightColors.NONE;
    this._render();
  }


  applyPreview() {
    if (this._preview === null) { return; }
    this._model.add(this._preview);
    this.cancelPreview();
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
