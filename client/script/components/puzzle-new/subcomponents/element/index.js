import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';

export class PuzzleElementComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._model = null;
  }


  static get createTemplate() {
    return createTemplate;
  }


  set model(value) {
    this._model = value;
    this._render();
  }


  _render() {
    if (!this._nodes || !this._model) { return; }
    this._nodes.tagName.textContent = this._model.tagName;
    this._nodes.id.value = this._model.id;
    this._nodes.classList.value = this._model.classList;
    this._nodes.attributeList.value = this._model.attributes;
    this._nodes.blockList.model = this._model.children;
  }

}
