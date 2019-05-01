export class MouseLeaveListener {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  handleEvent() {
    this._state.hoveredPiece = null;
  }

}
