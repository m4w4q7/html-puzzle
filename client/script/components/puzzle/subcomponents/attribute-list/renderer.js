import { getListDifference } from '../../utils.js';
import { createElement } from '../../../../utils.js';

export class AttributeListRenderer {

  constructor(host) {
    this._host = host;
    this._nodes = null;
    this._preview = null;
    this._previewColor = null;
    this._eventHandlers = null;
    this._renderAttribute = this._renderAttribute.bind(this);
  }


  render(nodes, { model, preview, previewColor }, eventHandlers) {
    this._nodes = { ...nodes, attributes: { ...nodes.attributes } };
    this._preview = preview;
    this._previewColor = previewColor;
    this._eventHandlers = null;
    this._eventHandlers = eventHandlers;

    const attributesToRender = this._preview ? model.listWithPreview(this._preview) : model.list();
    attributesToRender.forEach(this._renderAttribute);

    const renderedAttributeNames = Object.keys(this._nodes.attributes);
    const namesOfAttributesToRender = attributesToRender.map(attribute => attribute.name);
    const unusedAttributeNames = getListDifference(renderedAttributeNames, namesOfAttributesToRender);
    unusedAttributeNames.forEach(name => this._removeAttribute(name));

    return this._nodes;
  }


  _removeAttribute(name) {
    this._nodes.attributes[name].parentElement.remove();
    delete this._nodes.attributes[name];
  }


  _renderAttribute(attribute, index, attributesToRender) {
    const attributeComponent = this._nodes.attributes[attribute.name];
    if (attributeComponent) {
      if (this._isPreviewed(attribute)) {
        attributeComponent.preview(attribute, this._previewColor);
      } else {
        attributeComponent.model = attribute;
        attributeComponent.cancelPreview();
      }
    } else {
      this._renderNewAttribute(attribute, index, attributesToRender);
    }
  }


  _renderNewAttribute(attribute, index, attributesToRender) {
    const newAttribute = this._createAttribute(attribute);
    if (!this._isPreviewed(attribute)) { newAttribute.model = attribute; }
    this._nodes.attributes[attribute.name] = newAttribute;
    const separatedAttribute = this._createSeparatedAttribute(newAttribute);

    if (index === 0) {
      this._nodes.container.insertAdjacentElement('afterbegin', separatedAttribute);
    } else {
      const previousAttributeComponent = this._nodes.attributes[attributesToRender[index - 1].name];
      previousAttributeComponent.parentElement.insertAdjacentElement('afterend', separatedAttribute);
    }

    if (this._isPreviewed(attribute)) { newAttribute.preview(this._preview, this._previewColor); }
  }


  _isPreviewed(attribute) {
    return this._preview && attribute.name === this._preview.name;
  }


  _createAttribute() {
    const attribute = createElement('hpu-puzzle-attribute', { parentList: this._host });
    attribute.addEventListener('change', this._eventHandlers.onChange);
    return attribute;
  }


  _createSeparatedAttribute(attributeComponent) {
    return createElement('span', { className: 'hpu-puzzle-attribute-list__separated-attribute' }, [attributeComponent]);
  }

}
