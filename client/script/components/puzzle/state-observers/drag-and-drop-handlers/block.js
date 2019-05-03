import { isBlock } from '../../utils.js';
import { AbstractDragAndDropHandler } from './abstract-drag-and-drop-handler.js';

export class BlockDragAndDropHandler extends AbstractDragAndDropHandler {

  observe() {
    super.observe();
    this._state.observe('cursorPosition', this._onCursorPositionChange, this);
  }


  _onCursorPositionChange(cursorPosition) {
    if (!this._isRelevantPiece(this._draggedPiece)) { return; }
    this._onDragMove(cursorPosition);
  }


  _isRelevantPiece(piece) {
    return isBlock(piece);
  }


  _onDragStart(draggedPiece) {
    this._host.showBlockInserter(draggedPiece);
  }


  _onDragMove({ line, character }) {
    const indentation = Math.floor(character / 2);
    this._host.moveBlockInserter(line, indentation);
  }


  _onDragEnd() {
    this._host.adoptBlockInserterSubject();
    this._host.emitChange();
  }

}
