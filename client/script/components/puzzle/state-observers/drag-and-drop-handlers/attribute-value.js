import { HighlightColors } from '../../enums.js';
import { PieceTypes } from '../../../../enums/piece-types.js';
import { AbstractDragAndDropHandler } from './abstract-drag-and-drop-handler.js';


export class AttributeValueDragAndDropHandler extends AbstractDragAndDropHandler {

  constructor(...args) {
    super(...args);
    this._previousTargetAttribute = null;
  }


  observe() {
    super.observe();
    this._state.observe('hoveredPiece', this._onHoveredPieceChange, this);
  }


  get _draggedAttribute() {
    return this._draggedPiece && this._draggedPiece.parentAttribute || null;
  }


  get _targetAttribute() {
    const hoveredAttribute = this._getContainingAttribute(this._state.hoveredPiece);
    return hoveredAttribute === this._draggedAttribute ? null : hoveredAttribute;
  }


  _isRelevantPiece(piece) {
    return piece.pieceType === PieceTypes.ATTRIBUTE_VALUE;
  }


  _getContainingAttribute(piece) {
    if (!piece) { return null; }
    if (piece.pieceType === PieceTypes.ATTRIBUTE_VALUE) { return piece.parentAttribute; }
    if (piece.pieceType === PieceTypes.ATTRIBUTE) { return piece; }
    return null;
  }


  _onHoveredPieceChange() {
    if (!this._draggedPiece || !this._isRelevantPiece(this._draggedPiece)) { return; }
    this._onDragMove();
  }


  _onDragStart() {
    this._previousTargetAttribute = null;
  }


  _onDragMove() {
    const newTargetAttribute = this._targetAttribute;
    if (newTargetAttribute === this._previousTargetAttribute) { return; }

    if (this._previousTargetAttribute) {
      this._previousTargetAttribute.highlight(HighlightColors.NONE);
      this._previousTargetAttribute.valueComponent.highlight(HighlightColors.NONE);
    }

    if (newTargetAttribute) {
      newTargetAttribute.highlight(HighlightColors.ADD);
      newTargetAttribute.valueComponent.highlight(HighlightColors.ADD);
    }

    this._previousTargetAttribute = newTargetAttribute;
  }


  _onDragEnd(draggedPiece) {
    if (!this._previousTargetAttribute) { return; }

    const targetValue = this._previousTargetAttribute.model.value;
    this._previousTargetAttribute.applyValue(draggedPiece.value);
    this._previousTargetAttribute.highlight(HighlightColors.NONE);
    this._previousTargetAttribute.valueComponent.highlight(HighlightColors.NONE);
    draggedPiece.parentAttribute.applyValue(targetValue);

    this._host.emitChange();
  }

}
