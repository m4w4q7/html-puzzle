import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';

export class PuzzleAttributeValueComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._value = null;
  }

  static get createTemplate() {
    return createTemplate;
  }


  set value(value) {
    this._value = value;
    this.textContent = value ? `'${value}'` : '';
  }

}
