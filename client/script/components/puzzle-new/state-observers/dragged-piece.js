import { pieceTypes, dragStates } from '../enums.js';

export class DraggedPieceObserver {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._isObserving = false;
  }


  observe() {
    if (this._isObserving) { return; }
    this._state.observe('draggedPiece', this._onDraggedPieceChange, this);
  }


  _onDraggedPieceChange(draggedPiece, previousDraggedPiece) {
    if (draggedPiece) {
      this._onDraggingPiece(draggedPiece);
    } else {
      this._onReleasingPiece(previousDraggedPiece);
    }

  }


  _onDraggingPiece(draggedPiece) {
    this._host.setAttribute('dragging', '');
    draggedPiece.setAttribute('dragged', '');

    if (draggedPiece.pieceType === pieceTypes.element) {
      this._state.dragState = dragStates.beforeDrag;
      draggedPiece.hideChildren(() => this._state.dragState = dragStates.drag);
    } else {
      this._state.dragState = dragStates.drag;
    }
  }


  _onReleasingPiece(previousDraggedPiece) {
    this._host.removeAttribute('dragging');
    previousDraggedPiece.removeAttribute('dragged', '');

    if (previousDraggedPiece.pieceType === pieceTypes.element) {
      this._state.dragState = dragStates.afterDrag;
      previousDraggedPiece.showChildren(() => {
        if (this._state.draggedPiece !== null) { return; }
        this._state.dragState = dragStates.hover;
      });
    } else {
      this._state.dragState = dragStates.hover;
    }
  }

}
