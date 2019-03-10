import { dragTypes } from './enums.js';
import { findAncestor, getDragType } from './utils.js';
import { createForType } from './tag-piece-movers.js';
import { selectors, classes } from './dom-identifiers.js';

const tagPieceTypes = [dragTypes.id, dragTypes.class, dragTypes.attribute];


export class TagPieceDragMoveHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._blocks = [];
    this._activeLine = null;
    this._lastHoveredLine = null;
    this._mover = null;
  }


  activate() {
    this._state.observe('isDragging', this._onIsDraggingChange, this);
    this._host.addEventListener('mousemove', this._handleMouseMove.bind(this));
  }


  _onIsDraggingChange(isDragging) {
    if (!isDragging || !this._isTagPieceDragType()) { return; }

    this._blocks = [...this._host.querySelectorAll(selectors.block)];
    const blockParent = findAncestor(
      this._state.draggedElement,
      this._host,
      element => element.classList.contains(classes.block)
    );
    const blockIndex = this._blocks.indexOf(blockParent);
    this._activeLine = blockIndex;
    this._lastHoveredLine = blockIndex;
    this._mover = createForType(this._state.dragType, this._state.draggedElement, this._blocks[blockIndex]);
  }


  _handleMouseMove(event) {
    if (!this._state.isDragging || !this._isTagPieceDragType()) { return; }

    const line = this._getLine(event);
    if (line === this._lastHoveredLine) { return; }
    this._lastHoveredLine = line;

    if (getDragType(this._blocks[line]) === dragTypes.text) { return; }
    this._activeLine = line;

    this._mover.move(this._blocks[line]);
  }


  _isTagPieceDragType() {
    return tagPieceTypes.includes(this._state.dragType);
  }


  _getLine({ clientY }) {
    const { top } = this._host.getBoundingClientRect();
    const { height } = this._state.characterDimensions;
    return Math.floor((clientY - top) / height);
  }

}
