import { pageTemplate } from './page-template.js';
import { Html } from '../../html/index.js';
import { createElement } from '../../utils.js';


export class PreviewComponent extends HTMLElement {

  constructor() {
    super();
    this._iframe = document.createElement('iframe');
    this._iframeBody = null;
    this._model = null;
    this._setReady = null;
    this._whenReady = new Promise(resolve => this._setReady = resolve);
  }


  connectedCallback() {
    this.appendChild(this._iframe);
    const contentDocument = this._iframe.contentDocument;
    contentDocument.open();
    contentDocument.write(pageTemplate);
    contentDocument.close();

    if (contentDocument.readyState === 'loading') {
      this._iframe.contentWindow.addEventListener('DOMContentLoaded', this._setReady);
    } else {
      this._setReady();
    }

    this._whenReady.then(() => {
      this._iframeBody = this._iframe.contentDocument.body;
      this._render();
    });
  }


  set model(value) {
    this._model = value;
    this._render();
  }


  async addStyleSheet(url) {
    await this._addToHead(createElement('link', { rel: 'stylesheet' , href: url }));
  }


  async addScript(url) {
    await this._addToHead(createElement('script', { src: url }));

  }


  _render() {
    if (!this._model || !this._iframeBody) { return; }
    this._iframeBody.innerHTML = Html.render(this._model);
  }


  async _addToHead(element) {
    await this._whenReady;
    this._iframe.contentDocument.head.appendChild(element);
  }

}
