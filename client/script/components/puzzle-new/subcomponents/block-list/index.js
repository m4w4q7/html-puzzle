import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';
import { createElement, clearElement } from '../../../../utils.js';

export class PuzzleBlockListComponent extends AbstractPuzzleSubcomponent {

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
    this._nodes.container = clearElement(this._nodes.container);
    this._model.forEach(block => this._nodes.container.appendChild(this._createBlock(block)));
  }


  _createBlock(block) {
    return createElement(block.type === 'element' ? 'hpu-puzzle-element' : 'hpu-puzzle-text', { model: block });
  }

}
