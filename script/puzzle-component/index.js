import { examplePromise } from './example.js';
import { render } from '../render.js';
import { parse } from '../parse.js';
import { State } from './state.js';
import { HoverHandler } from './hover-handler.js';
import { DragHandler } from './drag-handler.js';


class PuzzleComponent extends HTMLElement {

  constructor() {
    super();
    this._state = new State();
    this._hoverHandler = new HoverHandler(this, this._state);
    this._dragHandler = new DragHandler(this, this._state);
  }


  connectedCallback() {
    examplePromise.then(example => {
      this.innerHTML = render(parse(example));
    });

    this._hoverHandler.activate();
    this._dragHandler.activate();
  }

}

export { PuzzleComponent };
