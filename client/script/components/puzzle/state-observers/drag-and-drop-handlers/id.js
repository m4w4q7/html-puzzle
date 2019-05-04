import { HighlightColors } from '../../enums.js';
import { PieceTypes } from '../../../../enums/piece-types.js';
import { AbstractElementPartDragAndDropHandler } from './abstract-element-part.js';


export class IdDragAndDropHandler extends AbstractElementPartDragAndDropHandler {

  constructor(...args) {
    super(...args);
    this._targetId = null;
  }


  _isRelevantPiece(piece) {
    return piece.pieceType === PieceTypes.ID;
  }


  _onDragStart(draggedPiece) {
    super._onDragStart(draggedPiece);
    this._targetId = draggedPiece;
  }


  _onDragMove(targetElement) {
    super._onDragMove(targetElement);
    if (this._targetId !== this._draggedPiece) { this._targetId.cancelPreview(); }
    this._targetId = targetElement.idComponent;
    this._targetId.preview(this._draggedPiece.value, HighlightColors.ADD);
    if (this._targetId !== this._draggedPiece) { this._draggedPiece.preview(this._targetId.value); }
  }


  _onDragEnd(draggedPiece) {
    super._onDragEnd(draggedPiece);
    this._targetId.applyPreview();
    draggedPiece.applyPreview();

    this._host.emitChange();
  }

}
