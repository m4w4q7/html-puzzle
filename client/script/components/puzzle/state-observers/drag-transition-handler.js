import { PieceTypes, DragStates, HighlightColors } from '../enums.js';

export class DragTransitionHandler {

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
    if (draggedPiece.pieceType === PieceTypes.ELEMENT) {
      this._state.dragState = DragStates.BEFORE_DRAG;
      draggedPiece.hideChildren(() => this._state.dragState = DragStates.DRAG);
    } else {
      this._state.dragState = DragStates.DRAG;
    }

    this._host.setAttribute('dragging', '');
    draggedPiece.highlight(HighlightColors.ADD);
  }


  _onReleasingPiece(previousDraggedPiece) {
    if (previousDraggedPiece.pieceType === PieceTypes.ELEMENT) {
      this._state.dragState = DragStates.AFTER_DRAG;
      previousDraggedPiece.showChildren(() => {
        if (this._state.draggedPiece !== null) { return; }
        this._state.dragState = DragStates.HOVER;
      });
    } else {
      this._state.dragState = DragStates.HOVER;
    }

    this._host.removeAttribute('dragging');
    previousDraggedPiece.highlight(HighlightColors.NONE);
    if (this._state.hoveredPiece) { this._state.hoveredPiece.highlight(HighlightColors.NEUTRAL); }
  }

}
