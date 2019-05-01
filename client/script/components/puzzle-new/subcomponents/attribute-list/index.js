import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createComponentTemplate } from './template.js';
import { highlightColors } from '../../enums.js';
import { AttributeListRenderer } from './renderer.js';

export class PuzzleAttributeListComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._model = null;
    this._renderer = new AttributeListRenderer(this);
  }

  static get createTemplate() {
    return createComponentTemplate;
  }


  get model() {
    return this._model;
  }


  set model(value) {
    this._model = value.sort(([name1], [name2]) => name1 < name2 ? -1 : name1 > name2 ? 1 : 0);
    this._render();
  }


  has(name) {
    return !!this._model.find(attribute => attribute[0] === name);
  }


  remove(name) {
    if (!this.has(name)) { return; }
    this._model = this._model.filter(attribute => attribute[0] !== name);
    this._render();
    this._emitChange();
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


  applyPreview() {
    if (this._preview === null) { return; }

    const hasPreviewedAttribute = this.has(this._preview[0]);
    this._model.splice(this._getIndex(this._preview[0]), hasPreviewedAttribute ? 1 : 0, this._preview);

    this.cancelPreview();
    this._emitChange();
  }


  _emitChange() {
    this.dispatchEvent(new CustomEvent('change'));
  }


  _getIndex(name) {
    const index = this._model.findIndex(attribute => attribute[0] >= name);
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
