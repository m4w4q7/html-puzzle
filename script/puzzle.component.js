import { exampleDomTree } from './example-dom-tree.js';
import { createHtmlFromDomModel } from './create-html-from-dom-model.js';

class PuzzleComponent extends HTMLElement {

  connectedCallback() {
    this.innerText = createHtmlFromDomModel(exampleDomTree);
  }

}

export { PuzzleComponent };
