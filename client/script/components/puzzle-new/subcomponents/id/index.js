import { createTemplate } from './template.js';

export class PuzzleIdComponent extends HTMLElement {

  constructor() {
    super();
    const { content, nodes } = createTemplate();
    this.attachShadow({ mode: 'open' }).appendChild(content);
    this._nodes = nodes;
  }


  set value(value) {
    this._nodes.id.textContent = value ? `#${value}` : '';
  }

}
