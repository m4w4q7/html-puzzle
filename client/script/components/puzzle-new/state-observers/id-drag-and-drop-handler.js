import { pieceTypes, highlightColors } from '../enums.js';
import { AbstractElementPartDragAndDropHandler } from './abstract-element-part-drag-and-drop-handler.js';


export class IdDragAndDropHandler extends AbstractElementPartDragAndDropHandler {

  constructor(...args) {
    super(...args);
    this._targetId = null;
  }


  get _handledPieceType() {
    return pieceTypes.id;
  }


  _onDragStart(draggedPiece) {
    this._targetId = draggedPiece;
  }


  _onDragMove(targetElement) {
    if (this._targetId !== this._draggedPiece) { this._targetId.cancelPreview(); }
    this._targetId = targetElement.idPiece;
    this._targetId.preview(this._draggedPiece.value, highlightColors.add);
    if (this._targetId !== this._draggedPiece) { this._draggedPiece.preview(this._targetId.value); }
  }


  _onDragEnd(draggedPiece) {
    this._targetId.applyPreview();
    draggedPiece.applyPreview();
  }

}
