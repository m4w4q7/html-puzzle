import template from './template.html.js';
import { doOnNext, minMax } from '../../utils.js';

const separatorWidth = 32;

export class HorizontalResizableComponent extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
    this._startResizing = this._startResizing.bind(this);
    this._stopResizing = this._stopResizing.bind(this);
    this._onSeparatorDrag = this._onSeparatorDrag.bind(this);
    this._applyRatio = this._applyRatio.bind(this);
    this._dom = {
      leftPane: this.shadowRoot.querySelector('.horizontal-resizable__left-pane'),
      rightPane: this.shadowRoot.querySelector('.horizontal-resizable__right-pane'),
      separator: this.shadowRoot.querySelector('.horizontal-resizable__separator')
    };
    this._ratio = 0.5;
    this._applyRatio();
  }


  static get observedAttributes() {
    return ['ratio'];
  }


  set ratio(value) {
    const parsedValue = parseFloat(value);
    this._ratio = isNaN(parsedValue) ? 0.5 : parsedValue;
    this._applyRatio();
  }


  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }


  connectedCallback() {
    this._dom.separator.addEventListener('mousedown', this._startResizing);
    this._dom.separator.addEventListener('dblclick', this._applyRatio);
  }


  _applyRatio() {
    const percentage = this._ratio * 100;
    this._dom.leftPane.style.width = `calc(${percentage}% - ${separatorWidth / 2}px)`;
    this._dom.rightPane.style.width = `calc(${100 - percentage}% - ${separatorWidth / 2}px)`;
  }


  _startResizing() {
    doOnNext(document, 'mouseup', this._stopResizing);
    document.addEventListener('mousemove', this._onSeparatorDrag);
    document.body.style.cursor = 'ew-resize';
    this._dom.leftPane.classList.add('horizontal-resizable__overlayed');
    this._dom.rightPane.classList.add('horizontal-resizable__overlayed');
  }


  _stopResizing() {
    document.removeEventListener('mousemove', this._onSeparatorDrag);
    document.body.style.cursor = '';
    this._dom.leftPane.classList.remove('horizontal-resizable__overlayed');
    this._dom.rightPane.classList.remove('horizontal-resizable__overlayed');
  }


  _onSeparatorDrag({ clientX }) {
    const { left, width } = this.getBoundingClientRect();
    const leftPaneWidth = minMax(clientX - left - (separatorWidth / 2), 0, width - separatorWidth);
    this._dom.leftPane.style.width = `${leftPaneWidth}px`;
    this._dom.rightPane.style.width = `${width - leftPaneWidth - separatorWidth}px`;
  }

}
