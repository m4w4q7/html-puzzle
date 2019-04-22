import { dragStates } from '../enums.js';

export class HoveredPieceObserver {

  constructor(state) {
    this._state = state;
    this._isObserving = false;
  }


  observe() {
    if (this._isObserving) { return; }
    this._state.observe('hoveredPiece', this._onHoveredPieceCahnge, this);
  }


  _onHoveredPieceCahnge(hoveredPiece, previousHoveredPiece) {
    if (hoveredPiece && this._state.dragState === dragStates.hover) {
      hoveredPiece.setAttribute('hovered', '');
    }
    if (previousHoveredPiece) { previousHoveredPiece.removeAttribute('hovered'); }
  }

}
