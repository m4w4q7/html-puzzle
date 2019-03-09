import { doOnNext, reflow } from './utils.js';

const draggedClass = 'hpu-puzzle__dragged';

export class DragStartHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._cancelTransitionEnd = null;
  }


  activate() {
    this._host.addEventListener('mousedown', this._handleMouseDown.bind(this));
  }


  _handleMouseDown() {
    if (!this._state.highlightedElement) { return; }
    if (this._state.highlightedElement.classList.contains('hpu-puzzle__block')) {
      this._hideChildren();
    }

    this._setDraggedElement(this._state.highlightedElement);
    doOnNext(document, 'mouseup', this._handleMouseUp.bind(this));
  }


  _hideChildren() {
    const children = this._state.highlightedElement.querySelector('.hpu-puzzle__children');
    if (!children || !children.children) { return; }

    const fullHeight = `${children.scrollHeight}px`;
    children.style.height = fullHeight;
    reflow(children);
    children.style.height = '0';
  }


  _setDraggedElement(element) {
    if (this._state.draggedElement) { this._state.draggedElement.classList.remove(draggedClass); }
    if (element) {
      element.classList.add(draggedClass);
      this._cancelTransitionEnd = doOnNext(element, 'transitionend', () => this._state.isDragging = true);
    } else {
      if (this._cancelTransitionEnd) { this._cancelTransitionEnd(); }
    }

    this._state.dragType = element ? element.getAttribute('data-drag-type') : null;
    this._state.draggedElement = element;
    this._host.classList.toggle('hpu-puzzle--dragging', !!element);
  }


  _handleMouseUp() { // TODO: it also handles drop (background-color change), so it should be refactored
    if (!this._state.draggedElement) { return; }
    if (this._state.draggedElement.classList.contains('hpu-puzzle__block') && !this._state.isDragging) {
      this._showChildren();
    }
    this._state.isDragging = false;
    this._setDraggedElement(null);
  }


  _showChildren() {
    const children = this._state.draggedElement.querySelector('.hpu-puzzle__children');
    if (!children || !children.children) { return; }

    const fullHeight = `${children.scrollHeight}px`;
    const draggedElement = this._state.draggedElement;
    doOnNext(children, 'transitionend', () => {
      if (draggedElement !== this._state.draggedElement) { children.style.height = ''; }
    });
    children.style.height = fullHeight;
  }

}
