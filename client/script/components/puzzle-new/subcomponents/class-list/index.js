import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';
import { clearElement, createElement, createDocumentFragment } from '../../../../utils.js';

export class PuzzleClassListComponent extends AbstractPuzzleSubcomponent {

  constructor() {
    super();
    this._value = null;
  }

  static get createTemplate() {
    return createTemplate;
  }


  set value(value) {
    this._value = value.sort();
    this._render();
  }


  _render() {
    if (!this._nodes || !this._value) { return; }
    this._nodes.container = clearElement(this._nodes.container);
    this._nodes.container.appendChild(this._createClasses(this._value));
  }


  _createClasses(classes) {
    const nodes = classes.map(className => createElement('hpu-puzzle-class', { value: className }));
    return createDocumentFragment(nodes);
  }

}
