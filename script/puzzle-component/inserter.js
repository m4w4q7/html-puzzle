import { createElement } from './utils.js';

const inserterClass = 'ths-puzzle__inserter';
const indentationClass = 'ths-puzzle__children';
const positionerClass = 'ths-puzzle__positioner';

export class Inserter {

  constructor() {
    this._indentationContainer = createElement('div');
    this._positionerElement = createElement('div', { className: positionerClass });
    this._inserterElement = createElement('div', { className: inserterClass }, [
      this._positionerElement,
      this._indentationContainer
    ]);
    this._inserterElement.classList.add(inserterClass);
    this._maxIndentation = null;
    this._hiddenIndentation = null;
  }


  setIndentationSize(indentationSize) {
    this._indentationSize = indentationSize;
  }


  setElementForInserting(element) {
    this._elementForInserting = element;

  }


  showBeforeBlock(block, indentation, maxIndentation) {
    this._positionerElement.appendChild(this._elementForInserting);
    this._setMaxIndentation(maxIndentation);
    this.moveToIndentation(indentation);
    block.insertAdjacentElement('beforebegin', this._inserterElement);
  }


  showLast(container, indentation, maxIndentation) {
    this._positionerElement.appendChild(this._elementForInserting);
    this._setMaxIndentation(maxIndentation);
    this.moveToIndentation(indentation);
    container.appendChild(this._inserterElement);
  }


  moveToIndentation(indentation) {
    const indentationWithinBoundaries = Math.min(indentation, this._maxIndentation);
    this._setVisibleIndentations(indentationWithinBoundaries);
    this._positionerElement.style.left = `${indentationWithinBoundaries * this._indentationSize}px`;
  }


  hide() {
    this._inserterElement.parentElement.removeChild(this._inserterElement);
  }


  _setMaxIndentation(maxIndentation) { // TODO: optimize
    this._maxIndentation = maxIndentation;
    if (this._indentationContainer.firstChild) {
      this._indentationContainer.removeChild(this._indentationContainer.firstChild);
    }
    this._indentationContainer.appendChild(this._createIndentation(maxIndentation));
  }


  _setVisibleIndentations(indentationIndex) {
    const indentations = this._indentationContainer.querySelectorAll(`.${indentationClass}`);
    const indentationToBeHidden = indentations[indentationIndex];

    if (indentationToBeHidden === this._hiddenIndentation) { return; }
    if (indentationToBeHidden) { indentationToBeHidden.style.visibility = 'hidden'; }
    if (this._hiddenIndentation) { this._hiddenIndentation.style.visibility = ''; }
    this._hiddenIndentation = indentationToBeHidden;

  }


  _createIndentation(level) {
    const root = document.createDocumentFragment();
    let deepestIndentation = root;

    for (let i = 0; i < level; i++) {
      let indentation = createElement('div', { className: indentationClass });
      deepestIndentation.appendChild(indentation);
      deepestIndentation = indentation;
    }
    deepestIndentation.innerHTML = '&nbsp;';

    return root;
  }

}
