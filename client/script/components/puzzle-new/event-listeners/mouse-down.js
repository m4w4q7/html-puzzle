export class MouseDownListener {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  handleEvent() {
    this._state.characterDimensions = this._host.getCharacterDimensions();
    this._state.draggedPiece = this._state.hoveredPiece;
  }

}
