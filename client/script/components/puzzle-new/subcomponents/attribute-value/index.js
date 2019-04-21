import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';

export class PuzzleAttributeValueComponent extends AbstractPuzzleSubcomponent {

  static get createTemplate() {
    return createTemplate;
  }


  set value(value) {
    this._nodes.value.textContent = value ? `'${value}'` : '';
  }

}
