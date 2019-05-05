export class MouseDownListener {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  handleEvent(event) {
    if (event.button !== 0 || this._state.draggedPiece) { return; }
    this._state.characterDimensions = this._host.getCharacterDimensions();
    this._state.draggedPiece = this._state.hoveredPiece;
  }

}
