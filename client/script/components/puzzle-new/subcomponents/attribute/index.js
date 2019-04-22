import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';

export class PuzzleAttributeComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._name = null;
    this._value = null;
  }


  static get createTemplate() {
    return createTemplate;
  }


  set name(value) {
    this._name = value;
    this._render();
  }


  set value(value) {
    this._value = value;
    this._render();
  }


  _render() {
    if (!this._nodes || this._name === null || this._value === null) { return; }
    this._nodes.name.textContent = this._name;
    this._nodes.valueContainer.style.display = this._value ? '' : 'none';
    this._nodes.value.value = this._value;
  }

}
