import { examplePromise } from './example.js';
import { render } from '../render.js';
import { parse } from '../parse.js';
import { State } from './state.js';
import { HoverHandler } from './hover-handler.js';
import { DragStartHandler } from './drag-start-handler.js';


class PuzzleComponent extends HTMLElement {

  constructor() {
    super();
    this._state = new State();
    this._hoverHandler = new HoverHandler(this, this._state);
    this._dragStartHandler = new DragStartHandler(this, this._state);
  }


  connectedCallback() {
    examplePromise.then(example => {
      this.innerHTML = render(parse(example));
    });

    this._hoverHandler.activate();
    this._dragStartHandler.activate();
  }

}

export { PuzzleComponent };
