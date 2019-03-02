import { queryDifference } from './utils.js';
import { Inserter } from './inserter.js';

export class DragMoveHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._blocks = [];
    this._inserter = new Inserter();
    this._inserterPosition = {
      line: null,
      absoluteIndentation: null
    };
    this._state.observe('characterDimensions', ({ width }) => this._inserter.setIndentationSize(width * 2));
  }


  activate() {
    this._state.observe('draggedElement', this._onDraggedElementChange, this);
    this._host.addEventListener('mousemove', this._handleMouseMove.bind(this));
  }


  _onDraggedElementChange(draggedElement) {
    if (draggedElement) {
      this._blocks = queryDifference(this._host, draggedElement, '.ths-puzzle__block');
      this._inserter.setElementForInserting(this._state.draggedElementClone);
    } else {
      this._inserter.hide();
    }
  }


  _handleMouseMove(event) {
    if (!this._state.draggedElement || !this._state.draggedElement.classList.contains('ths-puzzle__block')) { return; }
    const inserterPosition = this._calculateInserterPosition(event);
    this._setInserterPosition(inserterPosition);
  }


  _calculateInserterPosition({ clientX, clientY }) {
    const { left, top } = this._host.getBoundingClientRect();
    const { height, width } = this._state.characterDimensions;
    const line = Math.floor((clientY - top) / height);
    const absoluteIndentation = Math.floor((clientX - left) / width / 2);
    return { line, absoluteIndentation };
  }


  _setInserterPosition({ line, absoluteIndentation }) {
    if (line === this._inserterPosition.line && absoluteIndentation === this._inserterPosition.absoluteIndentation) {
      return;
    }

    const minIndentation = this._getMinIndentation(line);
    const relativeIndentation = Math.max((absoluteIndentation - minIndentation), 0);


    if (line !== this._inserterPosition.line) {
      const maxRelativeIndentation = this._getMaxIndentation(line) - minIndentation;
      if (line === this._blocks.length) {
        this._inserter.showLast(this._host, relativeIndentation, maxRelativeIndentation);
      } else {
        this._inserter.showBeforeBlock(this._blocks[line], relativeIndentation, maxRelativeIndentation);
      }
    } else {
      this._inserter.moveToIndentation(relativeIndentation);
    }

    this._inserterPosition = { line, absoluteIndentation };
  }


  _getMinIndentation(line) {
    const nextBlock = this._blocks[line];
    return nextBlock ? this._getIndentation(nextBlock) : 0;
  }


  _getMaxIndentation(line) {
    if (line === 0) { return 0; }

    const previousBlock = this._blocks[line - 1];
    const isPreviousBlockAnElement = previousBlock.querySelector('.ths-puzzle__tag-name'); // TODO: sophisticate this
    return this._getIndentation(previousBlock) + (isPreviousBlockAnElement ? 1 : 0);
  }


  _getIndentation(block) { // TODO: use a model instead of actual dom
    let indentation = 0;
    for (let element = block.parentNode; element !== this._host; element = element.parentNode) {
      if (element.classList.contains('ths-puzzle__children')) { indentation++; }
    }
    return indentation;
  }

}
