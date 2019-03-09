import { dragTypes } from './enums.js';
import { findAncestor, getDragType } from './utils.js';
import { moveInlinePiece } from './move-inline-piece.js';
import { selectors, classes } from './dom-identifiers.js';

const inlineDragTypes = [dragTypes.id, dragTypes.class, dragTypes.attribute, dragTypes.attributeValue];


export class InlineDragMoveHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._blocks = [];
    this._activeLine = null;
    this._lastHoveredLine = null;
  }


  activate() {
    this._state.observe('isDragging', this._onIsDraggingChange, this);
    this._host.addEventListener('mousemove', this._handleMouseMove.bind(this));
  }


  _onIsDraggingChange(isDragging) {
    if (!isDragging || !this._isDragTypeInline()) { return; }

    this._blocks = [...this._host.querySelectorAll(selectors.block)];
    const blockParent = findAncestor(
      this._state.draggedElement,
      this._host,
      element => element.classList.contains(classes.block)
    );
    this._activeLine = this._blocks.indexOf(blockParent);
    this._lastHoveredLine = this._activeLine;
  }


  _handleMouseMove(event) {
    if (!this._state.isDragging || !this._isDragTypeInline()) { return; }

    const line = this._getLine(event);
    if (line === this._lastHoveredLine) { return; }
    this._lastHoveredLine = line;

    if (getDragType(this._blocks[line]) === dragTypes.text) { return; }
    this._activeLine = line;

    moveInlinePiece(this._state.draggedElement, this._blocks[line]);
  }


  _isDragTypeInline() {
    return inlineDragTypes.includes(this._state.dragType);
  }


  _getLine({ clientY }) {
    const { top } = this._host.getBoundingClientRect();
    const { height } = this._state.characterDimensions;
    return Math.floor((clientY - top) / height);
  }

}
