import { DragStates } from '../../enums.js';
import { PieceTypes } from '../../../../enums/piece-types.js';
import { AbstractMemberAccessError } from '../../../../abstract-member-access-error.js';


export class AbstractElementPartDragAndDropHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._lastDraggedPiece = null;
  }


  observe() {
    this._state.observe('dragState', this._onDragStateChange, this);
    this._state.observe(['cursorPosition', 'line'], this._onLineChange, this);
  }


  get _draggedPiece() {
    return this._state.draggedPiece;
  }


  get _handledPieceType() {
    throw new AbstractMemberAccessError();
  }


  _onDragStateChange(dragState, previousDragState) {
    if (dragState === DragStates.DRAG) {
      this._lastDraggedPiece = this._draggedPiece;
      if (this._isRelevantPiece(this._draggedPiece)) { this._onDragStart(this._draggedPiece); }
    } else if (previousDragState === DragStates.DRAG) {
      if (this._isRelevantPiece(this._lastDraggedPiece)) { this._onDragEnd(this._lastDraggedPiece); }
    }
  }


  _isRelevantPiece(piece) {
    return piece && piece.pieceType === this._handledPieceType;
  }


  _onLineChange(line) {
    if (!this._isRelevantPiece(this._draggedPiece)) { return; }
    const targetBlock = this._host.getBlock(line);
    if (targetBlock.pieceType === PieceTypes.TEXT) { return; }
    this._onDragMove(targetBlock);
  }


  _onDragStart(draggedPiece) {
    throw new AbstractMemberAccessError();
  }


  _onDragMove(targetElement) {
    throw new AbstractMemberAccessError();
  }


  _onDragEnd(draggedPiece) {
    throw new AbstractMemberAccessError();
  }

}
