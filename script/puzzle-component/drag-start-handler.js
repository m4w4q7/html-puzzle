import { doOnNext, reflow } from './utils.js';

export class DragStartHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state
  }


  activate() {
    this._host.addEventListener('mousedown', this._handleMouseDown.bind(this));
  }


  _handleMouseDown() {
    if (!this._state.highlightedElement) { return; }
    if (this._state.highlightedElement.classList.contains('ths-puzzle__block')) {
      this._hideChildren();
    }

    this._setDraggedElement(this._state.highlightedElement);;
    doOnNext(document, 'mouseup', this._handleMouseUp.bind(this));
  }


  _hideChildren() {
    const children = this._state.highlightedElement.querySelector('.ths-puzzle__children');
    if (!children || !children.children) { return; }

    const fullHeight = `${children.scrollHeight}px`;
    children.style.height = fullHeight;
    reflow(children);
    children.style.height = '0';
  }


  _setDraggedElement(element) {
    const draggedClass = 'ths-puzzle__dragged';
    if (this._state.draggedElement) { this._state.draggedElement.classList.remove(draggedClass); }
    if (element) { element.classList.add(draggedClass); }

    this._state.draggedElement = element;
    this._host.classList.toggle('ths-puzzle--dragging', !!element);
  }


  _handleMouseUp() {
    if (!this._state.draggedElement) { return; }
    if (this._state.draggedElement.classList.contains('ths-puzzle__block')) {
      this._showChildren();
    }
    this._setDraggedElement(null);
  }


  _showChildren() {
    const children = this._state.draggedElement.querySelector('.ths-puzzle__children');
    if (!children || !children.children) { return; }

    const fullHeight = `${children.scrollHeight}px`;
    const draggedElement = this._state.draggedElement;
    doOnNext(children, 'transitionend', () => {
      if (draggedElement !== this._state.draggedElement) { children.style.height = ''; }
    });
    children.style.height = fullHeight;
  }

}
