import { AbstractPuzzlePiece } from '../abstract-puzzle-piece/index.js';
import { createTemplate } from './template.js';

export class PuzzleTextComponent extends AbstractPuzzlePiece {

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
