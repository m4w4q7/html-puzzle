import { createElement } from '../../utils.js';
import { State } from './state.js';
import { PuzzleContentComponent } from './subcomponents/content/index.js';
import { MouseOverListener } from './event-listeners/mouse-over.js';
import { MouseLeaveListener } from './event-listeners/mouse-leave.js';
import { MouseDownListener } from './event-listeners/mouse-down.js';
import { MouseUpListener } from './event-listeners/mouse-up.js';
import { MouseMoveListener } from './event-listeners/mouse-move.js';
import { HoverHighlightHandler } from './state-observers/hover-highlight-handler.js';
import { DragTransitionHandler } from './state-observers/drag-transition-handler.js';
import { BlockDragAndDropHandler } from './state-observers/drag-and-drop-handlers/block.js';
import { IdDragAndDropHandler } from './state-observers/drag-and-drop-handlers/id.js';
import { ClassDragAndDropHandler } from './state-observers/drag-and-drop-handlers/class.js';
import { AttributeDragAndDropHandler } from './state-observers/drag-and-drop-handlers/attribute.js';
import { AttributeValueDragAndDropHandler } from './state-observers/drag-and-drop-handlers/attribute-value.js';
import { HintHandler } from './state-observers/hint-handler.js';
import { AbstractCustomElement } from '../abstract-custom-element/index.js';



export class PuzzleComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._state = new State();
    this._nodes = {
      content: createElement('hpu-puzzle-content')
    };
    this._model = null;

    this._mouseOverListener = new MouseOverListener(this._nodes.content, this._state);
    this._mouseLeaveListener = new MouseLeaveListener(this._nodes.content, this._state);
    this._mouseDownListener = new MouseDownListener(this._nodes.content, this._state);
    this._mouseUpListener = new MouseUpListener(this._nodes.content, this._state);
    this._mouseMoveListener = new MouseMoveListener(this._nodes.content, this._state);

    this._hoverHighlightHandler = new HoverHighlightHandler(this._nodes.content, this._state);
    this._dragTransitionHandler = new DragTransitionHandler(this._nodes.content, this._state);
    this._blockDragAndDropHandler = new BlockDragAndDropHandler(this._nodes.content, this._state);
    this._idDragAndDropHandler = new IdDragAndDropHandler(this._nodes.content, this._state);
    this._classDragAndDropHandler = new ClassDragAndDropHandler(this._nodes.content, this._state);
    this._attributeDragAndDropHandler = new AttributeDragAndDropHandler(this._nodes.content, this._state);
    this._attributeValueDragAndDropHandler = new AttributeValueDragAndDropHandler(this._nodes.content, this._state);
    this._hintHandler = new HintHandler(this._nodes.content, this._state);

    this._onChange = this._onChange.bind(this);
  }


  get model() {
    return this._model;
  }


  set model(value) {
    this._model = value.clone();
    this._nodes.content.model = this._model;
  }


  showHint(hint) {
    this._state.hint = hint;
  }


  hideHint() {
    this._state.hint = null;
  }


  connectedCallback() {
    this.appendChild(this._nodes.content);
    this._addEventListeners();
    this._addStateObservers();
  }


  _addEventListeners() {
    this._nodes.content.addEventListener('mouseover', this._mouseOverListener);
    this._nodes.content.addEventListener('mouseleave', this._mouseLeaveListener);
    this._nodes.content.addEventListener('mousedown', this._mouseDownListener);
    document.addEventListener('mouseup', this._mouseUpListener);
    this._nodes.content.addEventListener('mousemove', this._mouseMoveListener);

    this._nodes.content.addEventListener('change', this._onChange);
  }


  _addStateObservers() {
    this._hoverHighlightHandler.observe();
    this._dragTransitionHandler.observe();
    this._blockDragAndDropHandler.observe();
    this._idDragAndDropHandler.observe();
    this._classDragAndDropHandler.observe();
    this._attributeDragAndDropHandler.observe();
    this._attributeValueDragAndDropHandler.observe();
    this._hintHandler.observe();
  }


  _onChange() {
    this._model = this._nodes.content.model.clone();
    this.dispatchEvent(new CustomEvent('change', { detail: { model: this._model } }));
  }


  static get dependencies() {
    return [PuzzleContentComponent];
  }


  static get tagName() {
    return 'hpu-puzzle';
  }

}
