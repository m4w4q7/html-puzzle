import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';

export class PuzzleAttributeComponent extends AbstractPuzzleSubcomponent {

  static get createTemplate() {
    return createTemplate;
  }


  set name(value) {
    this._nodes.name.textContent = value;
  }


  set value(value) {
    this._nodes.valueContainer.style.display = value ? '' : 'none';
    this._nodes.value.value = value;
  }

}
