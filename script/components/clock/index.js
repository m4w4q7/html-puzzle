export class ClockComponent extends HTMLElement {

  constructor() {
    super();
    this._showTime(0);
    this._timeoutId = null;
    this._startDate = null;
    this._tick = this._tick.bind(this);
  }


  start() {
    this._startDate = new Date();
    this._showTime(0);
    this._timeoutId = setTimeout(this._tick, 1000);
  }


  stop() {
    clearTimeout(this._timeoutId);
  }


  get time() {
    return this._startDate && new Date() - this._startDate;
  }


  _showTime(elapsedSeconds) {
    const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(elapsedSeconds % 60).toString().padStart(2, '0');
    this.textContent = `${minutes}:${seconds}`;
  }


  _showSeconds(value) {
    this._dom.seconds.textContent = value.toString().padStart(2, '0');
  }


  _tick() {
    const elapsedTime = new Date() - this._startDate;
    this._showTime(elapsedTime / 1000);
    this._timeoutId = setTimeout(this._tick, 1000 - (elapsedTime % 1000));
  }

}
