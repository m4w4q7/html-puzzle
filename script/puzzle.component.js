import { render } from './render.js';
import { parse } from './parse.js';

const examplePromise = fetch('script/example.pug').then(response => response.text());

class PuzzleComponent extends HTMLElement {

  constructor() {
    super();
    this._highlightedElement = null;
  }

  connectedCallback() {
    examplePromise.then(example => {
      this.innerHTML = render(parse(example));
    });

    this.addEventListener('mouseover', this._handleMouseOver.bind(this));
    this.addEventListener('mouseleave', this._handleMouseLeave.bind(this));
  }


  _handleMouseOver({ target }) {
    const draggableTarget = this._getDraggableAncestor(target);
    if (draggableTarget === this._highlightedElement) return;

    this._setHighlightedElement(draggableTarget);
  }


  _handleMouseLeave() {
    this._setHighlightedElement(null);
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
