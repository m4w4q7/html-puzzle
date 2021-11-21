import { convertSecondsToTime } from '../../utils.js';
import { AbstractCustomElement } from '../abstract-custom-element/index.js';

export class ClockComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._showTime(0);
    this._timeoutId = null;
    this._startDate = null;
    this._tick = this._tick.bind(this);
  }


  start() {
    this.stop();
    this._startDate = new Date();
    this._showTime(0);
    this._timeoutId = setTimeout(this._tick, 1000);
  }


  stop() {
    clearTimeout(this._timeoutId);
  }


  clear() {
    this.stop();
    this._startDate = null;
    this._showTime(0);
  }


  get time() {
    return this._startDate && new Date() - this._startDate;
  }


  _showTime(elapsedSeconds) {
    this.textContent = convertSecondsToTime(elapsedSeconds);
  }


  _tick() {
    const elapsedTime = new Date() - this._startDate;
    this._showTime(elapsedTime / 1000);
    this._timeoutId = setTimeout(this._tick, 1000 - (elapsedTime % 1000));
  }


  static get tagName() {
    return 'hpu-clock';
  }

}
