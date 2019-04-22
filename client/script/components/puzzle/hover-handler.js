import { findAncestor } from './utils.js';

export class HoverHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  activate() {
    this._host.addEventListener('mouseover', this._handleMouseOver.bind(this));
    this._host.addEventListener('mouseleave', this._handleMouseLeave.bind(this));
  }


  _handleMouseOver({ target }) {
    if (this._state.draggedElement) { return; }
    const draggableTarget = this._getDraggableAncestor(target);
    if (draggableTarget === this._state.highlightedElement) return;

    this._setHighlightedElement(draggableTarget);
  }


  _getDraggableAncestor(target) {
    return findAncestor(target, this._host, element => element.hasAttribute('data-draggable'));
  }


  _setHighlightedElement(element) {
    const highlighterClass = 'hpu-puzzle__highlighted';
    if (this._state.highlightedElement) this._state.highlightedElement.classList.remove(highlighterClass);
    if (element) element.classList.add(highlighterClass);
    this._state.highlightedElement = element;
  }


  _handleMouseLeave() {
    if (this._state.draggedElement) { return; }
    this._setHighlightedElement(null);
  }
}