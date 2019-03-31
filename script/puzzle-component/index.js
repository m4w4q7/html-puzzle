import { examplePromise } from './example.js';
import { render } from './render.js';
import { parse } from '../parse.js';
import { State } from './state.js';
import { HoverHandler } from './hover-handler.js';
import { DragStartHandler } from './drag-start-handler.js';
import { BlockDragMoveHandler } from './block-drag-move-handler.js';
import { TagPieceDragMoveHandler } from './tag-piece-drag-move-handler.js';
import { BlockDropHandler } from './block-drop-handler.js';
import { AttributeValueDragMoveHandler } from './attribute-value-drag-handler.js';
import { createModelFromDom } from './create-model-from-dom.js';


class PuzzleComponent extends HTMLElement {

  constructor() {
    super();
    this._state = new State();
    this._hoverHandler = new HoverHandler(this, this._state);
    this._dragStartHandler = new DragStartHandler(this, this._state);
    this._blockDragMoveHandler = new BlockDragMoveHandler(this, this._state);
    this._tagPieceDragMoveHandler = new TagPieceDragMoveHandler(this, this._state);
    this._blockDropHandler = new BlockDropHandler(this, this._state);
    this._attributeValueDragMoveHandler = new AttributeValueDragMoveHandler(this, this._state);
  }


  connectedCallback() {
    examplePromise.then(example => {
      this.innerHTML = render(parse(example));
    });

    this._calculateCharacterDimensions();

    this._hoverHandler.activate();
    this._dragStartHandler.activate();
    this._blockDragMoveHandler.activate();
    this._tagPieceDragMoveHandler.activate();
    this._blockDropHandler.activate();
    this._attributeValueDragMoveHandler.activate();

    this._state.observe('isDragging', isDragging => isDragging || this._emitChange());
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


  _emitChange() {
    const model = createModelFromDom(this);
    this.dispatchEvent(new CustomEvent('change', { detail: { model } }));
  }

}

export { PuzzleComponent };
