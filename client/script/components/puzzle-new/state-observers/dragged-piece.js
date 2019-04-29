import { pieceTypes, dragStates } from '../enums.js';
import { reflow } from '../utils.js';

export class DraggedPieceObserver {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  observe() {
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
    if (draggedPiece.pieceType === pieceTypes.element) {
      this._state.dragState = dragStates.beforeDrag;
      draggedPiece.hideChildren(() => this._state.dragState = dragStates.drag);
    } else {
      this._state.dragState = dragStates.drag;
    }

    reflow(this._host);
    this._host.setAttribute('dragging', '');
    draggedPiece.setAttribute('dragged', '');
  }


  _onReleasingPiece(previousDraggedPiece) {
    if (previousDraggedPiece.pieceType === pieceTypes.element) {
      this._state.dragState = dragStates.afterDrag;
      previousDraggedPiece.showChildren(() => {
        if (this._state.draggedPiece !== null) { return; }
        this._state.dragState = dragStates.hover;
      });
    } else {
      this._state.dragState = dragStates.hover;
    }

    reflow(this._host);
    this._host.removeAttribute('dragging');
    previousDraggedPiece.removeAttribute('dragged', '');
  }

}
