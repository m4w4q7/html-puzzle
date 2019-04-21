import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';

export class PuzzleTextComponent extends AbstractPuzzleSubcomponent {

  static get createTemplate() {
    return createTemplate;
  }


  set model({ text }) {
    this._nodes.text.textContent = `| ${text}`;
  }

}
