import { dragStates, highlightColors } from '../enums.js';

export class HoverHighlightHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  observe() {
    this._state.observe('hoveredPiece', this._onHoveredPieceChange, this);
  }


  _onHoveredPieceChange(hoveredPiece, previousHoveredPiece) {
    if (this._state.dragState !== dragStates.hover) { return; }
    if (hoveredPiece) { hoveredPiece.highlight(highlightColors.neutral); }
    if (previousHoveredPiece) { previousHoveredPiece.highlight(highlightColors.none); }
  }

}
