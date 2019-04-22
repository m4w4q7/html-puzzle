import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';

export class PuzzleTextComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._model = null;
  }

  static get createTemplate() {
    return createTemplate;
  }


  set model(value) {
    this._model = value;
    this.textContent = `| ${value.text}`;
  }

}
