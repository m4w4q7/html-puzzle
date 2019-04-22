export class HoverHighlighter {

  constructor(state) {
    this._state = state;
    this._isObserving = false;
  }


  observe() {
    if (this._isObserving) { return; }

    this._state.observe('hoveredPiece', (hoveredPiece, previousHoveredPiece) => {
      if (hoveredPiece) { hoveredPiece.setAttribute('hovered', ''); }
      if (previousHoveredPiece) { previousHoveredPiece.removeAttribute('hovered'); }
    });
  }

}
