import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';
import { clearElement, createElement, createDocumentFragment } from '../../../../utils.js';

export class PuzzleClassListComponent extends AbstractPuzzleSubcomponent {

  static get createTemplate() {
    return createTemplate;
  }


  set value(classes) {
    this._nodes.container = clearElement(this._nodes.container);
    this._nodes.container.appendChild(this._createClasses(classes));
  }


  _createClasses(classes) {
    const nodes = classes.map(className => createElement('hpu-puzzle-class', { value: className }));
    return createDocumentFragment(nodes);
  }

}
