import { DragStates } from '../../enums.js';
import { AbstractMemberAccessError } from '../../../../abstract-member-access-error.js';


export class AbstractDragAndDropHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._lastDraggedPiece = null;
  }


  observe() {
    this._state.observe('dragState', this._onDragStateChange, this);
  }


  get _draggedPiece() {
    return this._state.draggedPiece;
  }


  _onDragStateChange(dragState, previousDragState) {
    if (dragState === DragStates.DRAG) {
      this._lastDraggedPiece = this._draggedPiece;
      if (this._draggedPiece && this._isRelevantPiece(this._draggedPiece)) {
        this._onDragStart(this._draggedPiece);
      }
    } else if (previousDragState === DragStates.DRAG &&
        this._lastDraggedPiece && this._isRelevantPiece(this._lastDraggedPiece)) {
      this._onDragEnd(this._lastDraggedPiece);
    }
  }


  _isRelevantPiece(piece) {
    throw new AbstractMemberAccessError();
  }


  _onDragStart(draggedPiece) {
    throw new AbstractMemberAccessError();
  }


  _onDragEnd(draggedPiece) {
    throw new AbstractMemberAccessError();
  }

}
