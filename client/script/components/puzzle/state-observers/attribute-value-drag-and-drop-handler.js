import { DragStates } from '../enums.js';
import { PieceTypes, HighlightColors } from '../enums.js';


export class AttributeValueDragAndDropHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._lastDraggedPiece = null;
    this._previousTargetAttribute = null;
  }


  observe() {
    this._state.observe('dragState', this._onDragStateChange, this);
    this._state.observe('hoveredPiece', this._onHoveredPieceChange, this);
  }


  get _draggedPiece() {
    return this._state.draggedPiece;
  }


  get _draggedAttribute() {
    return this._draggedPiece && this._draggedPiece.parentAttribute || null;
  }


  get _targetAttribute() {
    const hoveredAttribute = this._getContainingAttribute(this._state.hoveredPiece);
    return hoveredAttribute === this._draggedAttribute ? null : hoveredAttribute;
  }


  _onDragStateChange(dragState, previousDragState) {
    if (dragState === DragStates.DRAG) {
      this._lastDraggedPiece = this._draggedPiece;
      if (this._isRelevantPiece(this._draggedPiece)) { this._onDragStart(); }
    } else if (previousDragState === DragStates.DRAG && this._isRelevantPiece(this._lastDraggedPiece)) {
      this._onDragEnd(this._lastDraggedPiece);
    }
  }


  _getContainingAttribute(piece) {
    if (!piece) { return null; }
    if (piece.pieceType === PieceTypes.ATTRIBUTE_VALUE) { return piece.parentAttribute; }
    if (piece.pieceType === PieceTypes.ATTRIBUTE) { return piece; }
    return null;
  }


  _isRelevantPiece(piece) {
    return piece && piece.pieceType === PieceTypes.ATTRIBUTE_VALUE;
  }


  _onHoveredPieceChange() {
    if (!this._isRelevantPiece(this._draggedPiece)) { return; }
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

    const targetValue = this._previousTargetAttribute.model[1];
    this._previousTargetAttribute.applyValue(draggedPiece.value);
    this._previousTargetAttribute.highlight(HighlightColors.NONE);
    this._previousTargetAttribute.valueComponent.highlight(HighlightColors.NONE);
    draggedPiece.parentAttribute.applyValue(targetValue);

    this._host.emitChange();
  }

}
