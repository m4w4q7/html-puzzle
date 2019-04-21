import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createTemplate } from './template.js';

export class PuzzleElementComponent extends AbstractPuzzleSubcomponent {

  static get createTemplate() {
    return createTemplate;
  }


  set model({ tagName, id, classList, attributes, children }) {
    this._nodes.tagName.textContent = tagName;
    this._nodes.id.value = id;
    this._nodes.classList.classes = classList;
    this._nodes.attributeList.attributes = attributes;
    this._nodes.blockList.model = children;
  }

}
