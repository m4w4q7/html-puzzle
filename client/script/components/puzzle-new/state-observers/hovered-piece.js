import { dragStates } from '../enums.js';

export class HoveredPieceObserver {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  observe() {
    this._state.observe('hoveredPiece', this._onHoveredPieceChange, this);
  }


  _onHoveredPieceChange(hoveredPiece, previousHoveredPiece) {
    if (hoveredPiece && this._state.dragState === dragStates.hover) {
      hoveredPiece.setAttribute('hovered', '');
    }
    if (previousHoveredPiece) { previousHoveredPiece.removeAttribute('hovered'); }
  }

}
