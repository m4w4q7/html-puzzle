import { createElement } from '../../utils.js';
import { PuzzleBlockListComponent } from './subcomponents/block-list/index.js';
import { PuzzleElementComponent } from './subcomponents/element/index.js';
import { PuzzleIdComponent } from './subcomponents/id/index.js';
import { PuzzleClassListComponent } from './subcomponents/class-list/index.js';
import { PuzzleClassComponent } from './subcomponents/class/index.js';
import { PuzzleAttributeListComponent } from './subcomponents/attribute-list/index.js';
import { PuzzleAttributeComponent } from './subcomponents/attribute/index.js';
import { PuzzleAttributeValueComponent } from './subcomponents/attribute-value/index.js';
import { PuzzleTextComponent } from './subcomponents/text/index.js';
import { State } from './state.js';


export class PuzzleComponent extends HTMLElement {

  constructor() {
    super();
    this._state = new State();
    this._nodes = {
      blockList: createElement('hpu-puzzle-block-list', { state: this._state })
    };
  }


  set model(value) {
    this._nodes.blockList.model = value;
  }


  connectedCallback() {
    this.appendChild(this._nodes.blockList);
  }


  static define(name) {
    customElements.define('hpu-puzzle-block-list', PuzzleBlockListComponent);
    customElements.define('hpu-puzzle-element', PuzzleElementComponent);
    customElements.define('hpu-puzzle-id', PuzzleIdComponent);
    customElements.define('hpu-puzzle-class-list', PuzzleClassListComponent);
    customElements.define('hpu-puzzle-class', PuzzleClassComponent);
    customElements.define('hpu-puzzle-attribute-list', PuzzleAttributeListComponent);
    customElements.define('hpu-puzzle-attribute', PuzzleAttributeComponent);
    customElements.define('hpu-puzzle-attribute-value', PuzzleAttributeValueComponent);
    customElements.define('hpu-puzzle-text', PuzzleTextComponent);
    customElements.define(name, PuzzleComponent);
  }

}
