import { dragStates, pieceTypes, highlightColors } from '../enums.js';

export class IdDragAndDropHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._lastDraggedPiece = null;
  }


  observe() {
    this._state.observe('dragState', this._onDragStateChange, this);
    this._state.observe(['cursorPosition', 'line'], this._onLineChange, this);
  }


  get _draggedValue() {
    return this._state.draggedPiece && this._state.draggedPiece.value;
  }


  get _draggedPiece() {
    return this._state.draggedPiece;
  }


  get _handledPieceType() {
    return pieceTypes.id;
  }


  _onDragStateChange(dragState, previousDragState) {
    if (dragState === dragStates.drag) {
      this._lastDraggedPiece = this._draggedPiece;
      if (this._isRelevantPiece(this._draggedPiece)) { this._onDragStart(this._draggedPiece); }
    } else if (previousDragState === dragStates.drag) {
      if (this._isRelevantPiece(this._lastDraggedPiece)) { this._onDragEnd(this._lastDraggedPiece); }
    }
  }


  _isRelevantPiece(piece) {
    return piece && piece.pieceType === this._handledPieceType;
  }


  _onLineChange(line) {
    if (!this._isRelevantPiece(this._draggedPiece)) { return; }
    const targetBlock = this._host.getBlock(line);
    if (targetBlock.pieceType === pieceTypes.text) { return; }
    this._onDragMove(targetBlock);
  }


  _onDragStart(draggedPiece) {
    this._targetId = draggedPiece;
  }


  _onDragMove(targetElement) {
    if (this._targetId !== this._draggedPiece) { this._targetId.cancelPreview(); }
    this._targetId = targetElement.idPiece;
    this._targetId.preview(this._draggedValue, highlightColors.add);
    if (this._targetId !== this._draggedPiece) { this._draggedPiece.preview(this._targetId.value); }
  }


  _onDragEnd(draggedPiece) {
    this._targetId.applyPreview();
    draggedPiece.applyPreview();
  }

}
