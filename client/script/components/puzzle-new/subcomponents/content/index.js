import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';

export class PuzzleContentComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._model = null;
  }


  set model(model) {
    this._model = model;
    this._render();
  }


  getCharacterDimensions() {
    if (!this._nodes) { return { width: 0, height: 0 }; }
    const { width, height } = this._nodes.characterSpecimen.getBoundingClientRect();
    return { width, height };
  }


  _render() {
    if (!this._nodes || !this._model) { return; }
    this._nodes.blockList.model = this._model;
  }


  static get createTemplate() {
    return createTemplate;
  }

}
