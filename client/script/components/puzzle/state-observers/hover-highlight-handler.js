import { DragStates, HighlightColors } from '../enums.js';

export class HoverHighlightHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  observe() {
    this._state.observe('hoveredPiece', this._onHoveredPieceChange, this);
  }


  _onHoveredPieceChange(hoveredPiece, previousHoveredPiece) {
    if (this._state.dragState !== DragStates.HOVER) { return; }
    if (hoveredPiece) { hoveredPiece.highlight(HighlightColors.NEUTRAL); }
    if (previousHoveredPiece) { previousHoveredPiece.highlight(HighlightColors.NONE); }
  }

}
