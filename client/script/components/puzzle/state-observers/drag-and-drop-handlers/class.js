import { HighlightColors } from '../../enums.js';
import { PieceTypes } from '../../../../enums/piece-types.js';
import { AbstractElementPartDragAndDropHandler } from './abstract-element-part.js';


export class ClassDragAndDropHandler extends AbstractElementPartDragAndDropHandler {

  constructor(...args) {
    super(...args);
    this._previousTargetClassList = null;
  }


  get _handledPieceType() {
    return PieceTypes.CLASS;
  }


  get _draggedValue() {
    return this._draggedPiece.value;
  }


  get _draggedClassList() {
    return this._draggedPiece.parentList;
  }


  _onDragStart(draggedPiece) {
    const newTargetClassList = draggedPiece.parentList;

    newTargetClassList.preview(this._draggedValue, HighlightColors.ADD);
    newTargetClassList.remove(this._draggedValue);
    this._previousTargetClassList = newTargetClassList;
  }


  _onDragMove(targetElement) {
    const newTargetClassList = targetElement.classListComponent;
    if (newTargetClassList === this._previousTargetClassList) { return; }

    if (this._previousTargetClassList !== this._draggedClassList) {
      this._previousTargetClassList.cancelPreview();
    }

    newTargetClassList.preview(this._draggedValue, HighlightColors.ADD);

    if (newTargetClassList !== this._draggedClassList) {
      if (newTargetClassList.has(this._draggedValue)) {
        this._draggedClassList.preview(this._draggedValue);
      } else {
        this._draggedClassList.cancelPreview();
      }
    }

    this._previousTargetClassList = newTargetClassList;
  }


  _onDragEnd(draggedPiece) {
    this._previousTargetClassList.applyPreview();
    draggedPiece.parentList.applyPreview();

    this._host.emitChange();
  }

}
