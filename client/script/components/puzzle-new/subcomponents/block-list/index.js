import { createTemplate } from './template.js';
import { createElement, clearElement } from '../../../../utils.js';

export class PuzzleBlockListComponent extends HTMLElement {

  constructor() {
    super();
    const { content, nodes } = createTemplate();
    this.attachShadow({ mode: 'open' }).appendChild(content);
    this._nodes = nodes;
  }


  set model(value) {
    this._nodes.container = clearElement(this._nodes.container);
    value.forEach(block => this._nodes.container.appendChild(this._createBlock(block)));
  }


  _createBlock(block) {
    return createElement(block.type === 'element' ? 'hpu-puzzle-element' : 'hpu-puzzle-text', { model: block });
  }

}
