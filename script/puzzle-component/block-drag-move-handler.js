import { queryDifference } from './utils.js';
import { Inserter } from './inserter.js';
import { dragTypes } from './enums.js';


const blockClassName = 'ths-puzzle__block';


export class BlockDragMoveHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._blocks = [];
    this._inserter = new Inserter();
    this._state.observe('characterDimensions', ({ width }) => this._inserter.setIndentationSize(width * 2));
  }


  activate() {
    this._state.observe('isDragging', this._onIsDraggingChange, this);
    this._host.addEventListener('mousemove', this._handleMouseMove.bind(this));
  }


  _onIsDraggingChange(isDragging) {
    if (!this._isDragTypeBlock()) { return; }

    if (isDragging) {
      const indexOfBlock = [...this._host.querySelectorAll(`.${blockClassName}`)].indexOf(this._state.draggedElement);
      this._blocks = queryDifference(this._host, this._state.draggedElement, `.${blockClassName}`);
      this._inserter.setElementForInserting(this._state.draggedElement);
      this._state.inserterPosition = {}; // clear "cache" so inserter will always appear
      this._setInserterPosition({
        line: indexOfBlock,
        absoluteIndentation: this._getIndentation(this._state.draggedElement)
      });
    } else {
      this._inserter.hide(); // this causes glitch sometimes
    }
  }


  _handleMouseMove(event) {
    if (!this._state.isDragging || !this._isDragTypeBlock()) { return; }
    const inserterPosition = this._calculateInserterPosition(event);
    this._setInserterPosition(inserterPosition);
  }


  _isDragTypeBlock() {
    return [dragTypes.element, dragTypes.text].includes(this._state.dragType);
  }


  _calculateInserterPosition({ clientX, clientY }) {
    const { left, top } = this._host.getBoundingClientRect();
    const { height, width } = this._state.characterDimensions;
    const line = Math.floor((clientY - top) / height);
    const absoluteIndentation = Math.floor((clientX - left) / width / 2);
    return { line, absoluteIndentation };
  }


  _setInserterPosition({ line, absoluteIndentation }) {
    if (line === this._state.inserterPosition.line && absoluteIndentation === this._state.inserterPosition.absoluteIndentation) {
      return;
    }

    const minIndentation = this._getMinIndentation(line);
    const relativeIndentation = Math.max((absoluteIndentation - minIndentation), 0);

    if (line !== this._state.inserterPosition.line) {
      this._state.maxIndentation = this._getMaxIndentation(line);
      const maxRelativeIndentation = this._state.maxIndentation - minIndentation;
      if (line === this._blocks.length) {
        this._inserter.showLast(this._host, relativeIndentation, maxRelativeIndentation);
      } else {
        this._inserter.showBeforeBlock(this._blocks[line], relativeIndentation, maxRelativeIndentation);
      }
    } else {
      this._inserter.moveToIndentation(relativeIndentation);
    }

    this._state.inserterPosition = { line, absoluteIndentation };
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
