import { isBlock } from '../../utils.js';
import { DragStates } from '../../enums.js';

export class BlockDragAndDropHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._lastDraggedPiece = null;
  }


  observe() {
    this._state.observe('dragState', this._onDragStateChange, this);
    this._state.observe('cursorPosition', this._onCursorPositionChange, this);
  }


  _onDragStateChange(dragState, previousDragState) {
    if (dragState === DragStates.DRAG) {
      this._lastDraggedPiece = this._state.draggedPiece;
      if (isBlock(this._state.draggedPiece)) { this._host.showBlockInserter(this._state.draggedPiece); }
    } else if (previousDragState === DragStates.DRAG) {
      if (isBlock(this._lastDraggedPiece)) {
        this._host.adoptBlockInserterSubject();
        this._host.emitChange();
      }
    }
  }


  _onCursorPositionChange({ line, character }) {
    if (!this._isDraggingBlock()) { return; }
    const indentation = Math.floor(character / 2);
    this._host.moveBlockInserter(line, indentation);
  }


  _isDraggingBlock() {
    return isBlock(this._state.draggedPiece);
  }

}
