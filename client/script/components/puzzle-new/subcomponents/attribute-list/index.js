import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { createComponentTemplate, createSeparator } from './template.js';
import { clearElement, createElement, createDocumentFragment } from '../../../../utils.js';

export class PuzzleAttributeListComponent extends AbstractPuzzleSubcomponent {

  static get createTemplate() {
    return createComponentTemplate;
  }


  set value(attributes) {
    this._nodes.attributeContainer = clearElement(this._nodes.attributeContainer);
    this._nodes.wrapper.style.display = attributes.length ? '' : 'none';

    this._nodes.attributeContainer.appendChild(this._createAttributes(attributes));
  }


  _createAttributes(attributes) {
    if (!attributes.length) { return createDocumentFragment(); }

    const nodes = attributes.slice(1).reduce((nodes, attribute) => {
      nodes.push(createSeparator().content, this._createAttributeElement(attribute));
      return nodes;
    }, []);

    return createDocumentFragment([this._createAttributeElement(attributes[0]), ...nodes]);
  }


  _createAttributeElement([name, value]) {
    return createElement('hpu-puzzle-attribute', { name, value });
  }

}
