import { renderDocument } from './page-template.js';
import { Html } from '../../html/index.js';
import { createElement } from '../../utils.js';
import { createTemplateFactory } from '../../create-template-factory.js';
import { AbstractCustomElement } from '../abstract-custom-element/index.js';


export class PreviewComponent extends AbstractCustomElement {

  constructor() {
    super();
    this._onIframeContentLoaded = this._onIframeContentLoaded.bind(this);
    this._model = null;
    this._assets = { css: [], js: [] };
    this._nodes = {
      iframe: null,
      iframeBody: null,
      protected: []
    };
    this._setReady = null;
  }


  set assets({ css = [], js = [] }) {
    this._assets = { css, js };
    this._renderIframe();
  }


  set model(value) {
    this._model = value;
    this._renderContent();
  }


  connectedCallback() {
    this._renderIframe();
  }


  refresh() {
    this._renderIframe();
  }


  _renderIframe() {
    const iframe = createElement('iframe');
    if (this._nodes.iframe) {
      this.replaceChild(iframe, this._nodes.iframe);
      this._nodes.iframeBody = null;
    } else {
      this.appendChild(iframe);
    }

    this._nodes.iframe = iframe;
    const contentDocument = iframe.contentDocument;
    contentDocument.open('text/html', 'replace');
    contentDocument.write(renderDocument(this._assets));
    contentDocument.close();

    if (contentDocument.readyState === 'loading') {
      this._nodes.iframe.contentWindow.addEventListener('DOMContentLoaded', this._onIframeContentLoaded);
    } else {
      this._onIframeContentLoaded();
    }
  }


  _onIframeContentLoaded() {
    this._nodes.iframeBody = this._nodes.iframe.contentDocument.body;
    this._protectSkeleton();
    this._renderContent();
  }


  _protectSkeleton() {
    this._nodes.protected = [...this._nodes.iframeBody.childNodes];
  }


  _clearSkeleton() {
    [...this._nodes.iframeBody.childNodes].forEach(node => {
      if (!this._nodes.protected.includes(node)) { node.remove(); }
    });
  }


  _renderContent() {
    if (!this._model || !this._nodes.iframeBody) { return; }
    this._clearSkeleton();
    const modelHtml = Html.render(this._model);
    const fragment = createTemplateFactory(modelHtml)().content;
    this._nodes.iframeBody.appendChild(fragment);
  }


  static get tagName() {
    return 'hpu-preview';
  }

}
