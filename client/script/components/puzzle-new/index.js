import { createElement } from '../../utils.js';
import { State } from './state.js';
import { PuzzleContentComponent } from './subcomponents/content/index.js';
import { PuzzleBlockListComponent } from './subcomponents/block-list/index.js';
import { PuzzleElementComponent } from './subcomponents/element/index.js';
import { PuzzleIdComponent } from './subcomponents/id/index.js';
import { PuzzleClassListComponent } from './subcomponents/class-list/index.js';
import { PuzzleClassComponent } from './subcomponents/class/index.js';
import { PuzzleAttributeListComponent } from './subcomponents/attribute-list/index.js';
import { PuzzleAttributeComponent } from './subcomponents/attribute/index.js';
import { PuzzleAttributeValueComponent } from './subcomponents/attribute-value/index.js';
import { PuzzleTextComponent } from './subcomponents/text/index.js';
import { MouseOverListener } from './event-listeners/mouse-over.js';
import { MouseLeaveListener } from './event-listeners/mouse-leave.js';
import { MouseDownListener } from './event-listeners/mouse-down.js';
import { MouseUpListener } from './event-listeners/mouse-up.js';
import { MouseMoveListener } from './event-listeners/mouse-move.js';
import { HoveredPieceObserver } from './state-observers/hovered-piece.js';
import { DraggedPieceObserver } from './state-observers/dragged-piece.js';



export class PuzzleComponent extends HTMLElement {

  constructor() {
    super();
    this._state = new State();
    this._nodes = {
      content: createElement('hpu-puzzle-content')
    };

    this._mouseOverListener = new MouseOverListener(this._nodes.content, this._state);
    this._mouseLeaveListener = new MouseLeaveListener(this._nodes.content, this._state);
    this._mouseDownListener = new MouseDownListener(this._nodes.content, this._state);
    this._mouseUpListener = new MouseUpListener(this._nodes.content, this._state);
    this._mouseMoveListener = new MouseMoveListener(this._nodes.content, this._state);

    this._hoveredPieceObserver = new HoveredPieceObserver(this._nodes.content, this._state);
    this._draggedPieceObserver = new DraggedPieceObserver(this._nodes.content, this._state);
  }


  set model(value) {
    this._nodes.content.model = value;
  }


  connectedCallback() {
    this.appendChild(this._nodes.content);
    this._addEventListeners();
    this._addStateObservers();
  }


  static define(name) {
    customElements.define('hpu-puzzle-content', PuzzleContentComponent);
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


  _addEventListeners() {
    this._nodes.content.addEventListener('mouseover', this._mouseOverListener);
    this._nodes.content.addEventListener('mouseleave', this._mouseLeaveListener);
    this._nodes.content.addEventListener('mousedown', this._mouseDownListener);
    document.addEventListener('mouseup', this._mouseUpListener);
    this._nodes.content.addEventListener('mousemove', this._mouseMoveListener);
  }


  _addStateObservers() {
    this._hoveredPieceObserver.observe();
    this._draggedPieceObserver.observe();
  }

}
