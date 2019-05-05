export class MouseUpListener {

  constructor(host, state) {
    this._host = host;
    this._state = state;
  }


  handleEvent(event) {
    if (event.button !== 0) { return; }
    this._state.draggedPiece = null;
  }

}
