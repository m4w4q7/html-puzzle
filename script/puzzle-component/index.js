import { render } from '../render.js';
import { parse } from '../parse.js';

const examplePromise = fetch('script/example.pug').then(response => response.text());

const doOnNext = (element, eventName, callback) => {
  const unsubscribingCallback = event => {
    element.removeEventListener(eventName, unsubscribingCallback);
    callback(event);
  }
  element.addEventListener(eventName, unsubscribingCallback);
};

const reflow = element => void element.clientWidth;



class PuzzleComponent extends HTMLElement {

  constructor() {
    super();
    this._highlightedElement = null;
    this._draggedElement = null;
  }

  connectedCallback() {
    examplePromise.then(example => {
      this.innerHTML = render(parse(example));
    });

    this.addEventListener('mouseover', this._handleMouseOver.bind(this));
    this.addEventListener('mouseleave', this._handleMouseLeave.bind(this));
    this.addEventListener('mousedown', this._handleMouseDown.bind(this));
  }


  _handleMouseOver({ target }) {
    if (this._draggedElement) { return; }
    const draggableTarget = this._getDraggableAncestor(target);
    if (draggableTarget === this._highlightedElement) return;

    this._setHighlightedElement(draggableTarget);
  }


  _handleMouseLeave() {
    if (this._draggedElement) { return; }
    this._setHighlightedElement(null);
  }


  _handleMouseDown() {
    if (!this._highlightedElement) { return; }
    if (this._highlightedElement.classList.contains('ths-puzzle__block')) {
      this._hideChildren();
    }

    this._setDraggedElement(this._highlightedElement);;
    doOnNext(document, 'mouseup', this._handleMouseUp.bind(this));

  }


  _handleMouseUp() {
    if (!this._draggedElement) { return; }
    if (this._draggedElement.classList.contains('ths-puzzle__block')) {
      this._showChildren();
    }
    this._setDraggedElement(null);
  }


  _hideChildren() {
    const children = this._highlightedElement.querySelector('.ths-puzzle__children');
    if (!children || !children.children) { return; }

    const fullHeight = `${children.scrollHeight}px`;
    children.style.height = fullHeight;
    reflow(children);
    children.style.height = '0';
  }


  _showChildren() {
    const children = this._draggedElement.querySelector('.ths-puzzle__children');
    if (!children || !children.children) { return; }

    const fullHeight = `${children.scrollHeight}px`;
    const draggedElement = this._draggedElement;
    doOnNext(children, 'transitionend', () => {
      if (draggedElement !== this._draggedElement) { children.style.height = ''; }
    });
    children.style.height = fullHeight;

  }


  _setDraggedElement(element) {
    const draggedClass = 'ths-puzzle__dragged';
    if (this._draggedElement) { this._draggedElement.classList.remove(draggedClass); }
    if (element) { element.classList.add(draggedClass); }

    this._draggedElement = element;
    this.classList.toggle('ths-puzzle--dragging', !!element);
  }


  _getDraggableAncestor(target) {
    let currentTarget = target;
    while (currentTarget !== this && !currentTarget.hasAttribute('data-draggable')) {
      currentTarget = currentTarget.parentElement;
    }
    return currentTarget === this ? null : currentTarget;
  }


  _setHighlightedElement(element) {
    const highlighterClass = 'ths-puzzle__highlighted';
    if (this._highlightedElement) this._highlightedElement.classList.remove(highlighterClass);
    if (element) element.classList.add(highlighterClass);
    this._highlightedElement = element;
  }

}

export { PuzzleComponent };
