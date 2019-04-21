import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';

export class PuzzleIdComponent extends AbstractPuzzleSubcomponent {

  static get createTemplate() {
    return createTemplate;
  }


  set value(value) {
    this._nodes.id.textContent = value ? `#${value}` : '';
  }

}
