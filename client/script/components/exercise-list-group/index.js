import { AbstractTableRowCustomElement } from '../abstract-custom-element/index.js';
import { createTemplate } from './template.js';

export class ExerciseListGroupComponent extends AbstractTableRowCustomElement {

  constructor() {
    super();
    const { content, nodes } = createTemplate();
    this._content = content;
    this._nodes = nodes;
  }


  connectedCallback() {
    this.appendChild(this._content);
  }


  set name(value) {
    this._nodes.name.textContent = value;
  }


  static get extends() {
    return 'tr';
  }


  static get tagName() {
    return 'hpu-exercise-list-group';
  }

}
