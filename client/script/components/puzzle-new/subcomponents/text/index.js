import { createTemplate } from './template.js';

export class PuzzleTextComponent extends HTMLElement {

  constructor() {
    super();
    const { content, nodes } = createTemplate();
    this.attachShadow({ mode: 'open' }).appendChild(content);
    this._nodes = nodes;
  }


  set model({ text }) {
    this._nodes.text.textContent = `| ${text}`;
  }

}
