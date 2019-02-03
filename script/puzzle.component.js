import { createHtmlFromDomModel } from './create-html-from-dom-model.js';
// import { example } from './example.pug.js';
import { parse } from './parse.js';

const examplePromise = fetch('script/example.pug').then(response => response.text());

class PuzzleComponent extends HTMLElement {

  connectedCallback() {
    examplePromise.then(example => {
      this.innerHTML = createHtmlFromDomModel(parse(example));
    });
  }

}

export { PuzzleComponent };
