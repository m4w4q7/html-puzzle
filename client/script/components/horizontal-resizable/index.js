import { createTemplate } from './template.js';
import { doOnNext, minMax } from '../../utils.js';
import { AbstractCustomElement } from '../abstract-custom-element/index.js';

const SEPARATOR_WIDTH = 32;

export class HorizontalResizableComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._attachShadowedTemplate(createTemplate);
    this._startResizing = this._startResizing.bind(this);
    this._stopResizing = this._stopResizing.bind(this);
    this._onSeparatorDrag = this._onSeparatorDrag.bind(this);
    this._applyRatio = this._applyRatio.bind(this);
    this._nodes = {
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
    this._nodes.separator.addEventListener('mousedown', this._startResizing);
    this._nodes.separator.addEventListener('dblclick', this._applyRatio);
  }


  _applyRatio() {
    const percentage = this._ratio * 100;
    this._nodes.leftPane.style.width = `calc(${percentage}% - ${SEPARATOR_WIDTH / 2}px)`;
    this._nodes.rightPane.style.width = `calc(${100 - percentage}% - ${SEPARATOR_WIDTH / 2}px)`;
  }


  _startResizing() {
    doOnNext(document, 'mouseup', this._stopResizing);
    document.addEventListener('mousemove', this._onSeparatorDrag);
    document.body.style.cursor = 'ew-resize';
    this._nodes.leftPane.classList.add('horizontal-resizable__overlayed');
    this._nodes.rightPane.classList.add('horizontal-resizable__overlayed');
  }


  _stopResizing() {
    document.removeEventListener('mousemove', this._onSeparatorDrag);
    document.body.style.cursor = '';
    this._nodes.leftPane.classList.remove('horizontal-resizable__overlayed');
    this._nodes.rightPane.classList.remove('horizontal-resizable__overlayed');
  }


  _onSeparatorDrag({ clientX }) {
    const { left, width } = this.getBoundingClientRect();
    const leftPaneWidth = minMax(clientX - left - (SEPARATOR_WIDTH / 2), 0, width - SEPARATOR_WIDTH);
    this._nodes.leftPane.style.width = `${leftPaneWidth}px`;
    this._nodes.rightPane.style.width = `${width - leftPaneWidth - SEPARATOR_WIDTH}px`;
  }


  static get tagName() {
    return 'hpu-horizontal-resizable';
  }

}
