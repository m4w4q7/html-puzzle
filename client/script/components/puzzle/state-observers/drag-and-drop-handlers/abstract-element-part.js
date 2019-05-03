import { DragStates } from '../../enums.js';
import { PieceTypes } from '../../../../enums/piece-types.js';
import { AbstractMemberAccessError } from '../../../../abstract-member-access-error.js';
import { AbstractDragAndDropHandler } from './abstract-drag-and-drop-handler.js';


export class AbstractElementPartDragAndDropHandler extends AbstractDragAndDropHandler {

  observe() {
    super.observe();
    this._state.observe(['cursorPosition', 'line'], this._onLineChange, this);
  }


  _onDragStateChange(dragState, previousDragState) {
    if (dragState === DragStates.DRAG) {
      this._lastDraggedPiece = this._draggedPiece;
      if (this._isRelevantPiece(this._draggedPiece)) { this._onDragStart(this._draggedPiece); }
    } else if (previousDragState === DragStates.DRAG) {
      if (this._isRelevantPiece(this._lastDraggedPiece)) { this._onDragEnd(this._lastDraggedPiece); }
    }
  }


  _onLineChange(line) {
    if (!this._draggedPiece || !this._isRelevantPiece(this._draggedPiece)) { return; }
    const targetBlock = this._host.getBlock(line);
    if (targetBlock.pieceType === PieceTypes.TEXT) { return; }
    this._onDragMove(targetBlock);
  }


  _onDragMove(targetElement) {
    throw new AbstractMemberAccessError();
  }

}
