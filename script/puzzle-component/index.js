import { examplePromise } from './example.js';
import { render } from './render.js';
import { parse } from '../parse.js';
import { State } from './state.js';
import { HoverHandler } from './hover-handler.js';
import { DragStartHandler } from './drag-start-handler.js';
import { DragMoveHandler } from './drag-move-handler.js';
import { DropHandler } from './drop-handler.js';


class PuzzleComponent extends HTMLElement {

  constructor() {
    super();
    this._state = new State();
    this._hoverHandler = new HoverHandler(this, this._state);
    this._dragStartHandler = new DragStartHandler(this, this._state);
    this._dragMoveHandler = new DragMoveHandler(this, this._state);
    this._dropHandler = new DropHandler(this, this._state);
  }


  connectedCallback() {
    examplePromise.then(example => {
      this.innerHTML = render(parse(example));
    });

    this._calculateCharacterDimensions();

    this._hoverHandler.activate();
    this._dragStartHandler.activate();
    this._dragMoveHandler.activate();
    this._dropHandler.activate();
  }


  _calculateCharacterDimensions() {
    const character = document.createElement('div');
    character.innerHTML = '&nbsp;';
    character.style.display = 'inline-block';
    this.appendChild(character);
    const { clientWidth, clientHeight } = character;
    this.removeChild(character);
    this._state.characterDimensions = { width: clientWidth, height: clientHeight };
  }

}

export { PuzzleComponent };
