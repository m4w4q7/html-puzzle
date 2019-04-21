export class AbstractPuzzleSubcomponent extends HTMLElement {

  constructor() {
    super();
    const { content, nodes } = this.constructor.createTemplate();
    this.attachShadow({ mode: 'open' }).appendChild(content);
    this._nodes = nodes;
    this._state = null;
    this._onChildSubcomponentConnect = this._onChildSubcomponentConnect.bind(this);
  }


  set state(value) {
    this._state = value;
  }


  static createTemplate() {
    throw new Error('Abstract getter / method should be overridden!');
  }


  connectedCallback() {
    this.dispatchEvent(new CustomEvent('connected', { bubbles: true, composed: false }));
    this.shadowRoot.addEventListener('connected', this._onChildSubcomponentConnect);
  }


  _onChildSubcomponentConnect(event) {
    event.target.state = this._state;
    event.stopPropagation();
  }

}
