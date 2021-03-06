import { Attribute } from '../../../../model/attribute.js';
import { HighlightColors } from '../../enums.js';
import { PieceTypes } from '../../../../enums/piece-types.js';
import { AbstractElementPartDragAndDropHandler } from './abstract-element-part.js';


export class AttributeDragAndDropHandler extends AbstractElementPartDragAndDropHandler {

  constructor(...args) {
    super(...args);
    this._previousTargetAttributeList = null;
  }


  get _draggedModel() {
    return this._draggedPiece.model;
  }


  get _draggedAttributeList() {
    return this._draggedPiece.parentList;
  }


  _isRelevantPiece(piece) {
    return piece.pieceType === PieceTypes.ATTRIBUTE;
  }


  _onDragStart(draggedPiece) {
    super._onDragStart(draggedPiece);
    const newTargetAttributeList = draggedPiece.parentList;

    newTargetAttributeList.preview(this._draggedModel, HighlightColors.ADD);
    newTargetAttributeList.remove(this._draggedModel.name);
    this._previousTargetAttributeList = newTargetAttributeList;
  }


  _onDragMove(targetElement) {
    super._onDragMove(targetElement);
    const newTargetAttributeList = targetElement.attributeListComponent;
    if (newTargetAttributeList === this._previousTargetAttributeList) { return; }

    if (this._previousTargetAttributeList !== this._draggedAttributeList) {
      this._previousTargetAttributeList.cancelPreview();
    }

    newTargetAttributeList.preview(this._draggedModel, HighlightColors.ADD);

    if (newTargetAttributeList !== this._draggedAttributeList) {
      if (newTargetAttributeList.has(this._draggedModel.name)) {
        this._draggedAttributeList.preview(new Attribute(
          this._draggedModel.name,
          newTargetAttributeList.model.getByName(this._draggedModel.name).value
        ));
      } else {
        this._draggedAttributeList.cancelPreview();
      }
    }

    this._previousTargetAttributeList = newTargetAttributeList;
  }


  _onDragEnd(draggedPiece) {
    super._onDragEnd(draggedPiece);
    this._previousTargetAttributeList.applyPreview();
    draggedPiece.parentList.applyPreview();

    this._host.emitChange();
  }

}
