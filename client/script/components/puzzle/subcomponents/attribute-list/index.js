import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createComponentTemplate } from './template.js';
import { HighlightColors } from '../../enums.js';
import { AttributeListRenderer } from './renderer.js';
import { PuzzleAttributeComponent } from '../attribute/index.js';

export class PuzzleAttributeListComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._model = null;
    this._renderer = new AttributeListRenderer(this);
    this._onAttributeChange = this._onAttributeChange.bind(this);
  }

  static get createTemplate() {
    return createComponentTemplate;
  }


  get model() {
    return this._model;
  }


  set model(value) {
    this._model = value;
    this._render();
  }


  has(name) {
    return this._model.has(name);
  }


  getAttributeComponentByName(name) {
    return this._nodes.attributes[name];
  }


  remove(name) {
    if (!this.has(name)) { return; }
    this._model.removeByName(name);
    this._render();
    this._emitChange();
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


  applyPreview() {
    if (this._preview === null) { return; }
    this._model.add(this._preview);

    this.cancelPreview();
    this._emitChange();
  }


  _emitChange() {
    this.dispatchEvent(new CustomEvent('change'));
  }


  _onAttributeChange() {
    this._model.listNames().forEach(name => this._model.add(this._nodes.attributes[name].model));
    this._emitChange();
  }


  _render() {
    if (!this._nodes || !this._model) { return; }
    this._nodes = this._renderer.render(
      this._nodes,
      { model: this._model, preview: this._preview, previewColor: this._previewColor },
      { onChange: this._onAttributeChange }
    );
  }


  static get dependencies() {
    return [PuzzleAttributeComponent];
  }


  static get tagName() {
    return 'hpu-puzzle-attribute-list';
  }

}
