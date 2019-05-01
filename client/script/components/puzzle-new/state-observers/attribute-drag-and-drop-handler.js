import { pieceTypes, highlightColors } from '../enums.js';
import { AbstractElementPartDragAndDropHandler } from './abstract-element-part-drag-and-drop-handler.js';


export class AttributeDragAndDropHandler extends AbstractElementPartDragAndDropHandler {

  constructor(...args) {
    super(...args);
    this._previousTargetAttributeList = null;
  }


  get _handledPieceType() {
    return pieceTypes.attribute;
  }


  get _draggedModel() {
    return this._draggedPiece.model;
  }


  get _draggedAttributeList() {
    return this._draggedPiece.parentList;
  }


  _onDragStart(draggedPiece) {
    const newTargetAttributeList = draggedPiece.parentList;

    newTargetAttributeList.preview(this._draggedModel, highlightColors.add);
    newTargetAttributeList.remove(this._draggedModel[0]);
    this._previousTargetAttributeList = newTargetAttributeList;
  }


  _onDragMove(targetElement) {
    const newTargetAttributeList = targetElement.attributeListComponent;
    if (newTargetAttributeList === this._previousTargetAttributeList) { return; }

    if (this._previousTargetAttributeList !== this._draggedAttributeList) {
      this._previousTargetAttributeList.cancelPreview();
    }

    newTargetAttributeList.preview(this._draggedModel, highlightColors.add);

    if (newTargetAttributeList !== this._draggedAttributeList) {
      if (newTargetAttributeList.has(this._draggedModel[0])) {
        this._draggedAttributeList.preview([
          this._draggedModel[0],
          newTargetAttributeList.model.find(([name]) => name === this._draggedModel[0])[1]
        ]);
      } else {
        this._draggedAttributeList.cancelPreview();
      }
    }

    this._previousTargetAttributeList = newTargetAttributeList;
  }


  _onDragEnd(draggedPiece) {
    this._previousTargetAttributeList.applyPreview();
    draggedPiece.parentList.applyPreview();
  }

}
