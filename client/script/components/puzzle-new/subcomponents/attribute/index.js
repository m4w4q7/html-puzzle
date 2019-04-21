import { createTemplate } from './template.js';

export class PuzzleAttributeComponent extends HTMLElement {

  constructor() {
    super();
    const { content, nodes } = createTemplate();
    this.attachShadow({ mode: 'open' }).appendChild(content);
    this._nodes = nodes;
  }


  set name(value) {
    this._nodes.name.textContent = value;
  }


  set value(value) {
    this._nodes.valueContainer.style.display = value ? '' : 'none';
    this._nodes.value.textContent = `'${value}'`;
  }

}
