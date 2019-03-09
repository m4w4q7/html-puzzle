import { dragTypes } from './enums.js';
import { doOnNext } from './utils.js';

const blockClassName = 'hpu-puzzle__block';

export class BlockDropHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  activate() {
    this._state.observe('isDragging', this._handleIsDraggingChange.bind(this));
  }


  _handleIsDraggingChange(isDragging) {
    if (isDragging || ![dragTypes.element, dragTypes.text].includes(this._state.dragType)) { return; }

    const { parent, previousSibling } = this._getParentAndPreviousSibling();
    if (previousSibling) {
      previousSibling.insertAdjacentElement('afterend', this._state.draggedElement);
    } else {
      const container = parent === this._host ? parent : parent.querySelector('.hpu-puzzle__children');
      container.insertAdjacentElement('afterbegin', this._state.draggedElement);
    }

    this._showChildren();
  }


  _getParentAndPreviousSibling() {
    const blocksBefore = [...this._host.querySelectorAll(`.${blockClassName}`)]
      .slice(0, this._state.inserterPosition.line);

    const inserterIndentation = Math.min(this._state.maxIndentation, this._state.inserterPosition.absoluteIndentation);
    let parent = this._host;
    let previousSibling = null;
    for (let block of blocksBefore) {
      let blockIndentation = this._getIndentation(block);
      if (blockIndentation === inserterIndentation) {
        previousSibling = block;
      } else if (blockIndentation === inserterIndentation - 1) {
        previousSibling = null;
        parent = block;
      }
    }
    return { parent, previousSibling };
  }


  _getIndentation(block) { // TODO: It's a duplication!
    let indentation = 0;
    for (let element = block.parentNode; element !== this._host; element = element.parentNode) {
      if (element.classList.contains('hpu-puzzle__children')) { indentation++; }
    }
    return indentation;
  }


  _showChildren() { // TODO: It's a duplication!
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
