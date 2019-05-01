import { getListDifference } from '../../utils.js';
import { createElement } from '../../../../utils.js';
import { highlightColors } from '../../enums.js';

export class AttributeListRenderer {

  constructor(host) {
    this._host = host;
    this._nodes = null;
    this._preview = null;
    this._previewColor = null;
    this._renderAttribute = this._renderAttribute.bind(this);
  }


  render(nodes, { model, preview, previewColor }) {
    this._nodes = { ...nodes, attributes: { ...nodes.attributes } };
    this._preview = preview;
    this._previewColor = previewColor;

    const modelWithPreview = this._getModelWithPreview(model);
    modelWithPreview.forEach(this._renderAttribute);

    const renderedAttributeNames = Object.keys(this._nodes.attributes);
    const attributeNamesOfModelWithPreview = modelWithPreview.map(([name]) => name);
    const unusedAttributeNames = getListDifference(renderedAttributeNames, attributeNamesOfModelWithPreview);
    unusedAttributeNames.forEach(name => this._removeAttribute(name));

    return this._nodes;
  }


  _getModelWithPreview(model) {
    if (!this._preview) {
      return [...model];
    }
    const previewIndex = model.findIndex(([name]) => name === this._preview[0]);
    if (previewIndex === -1) {
      return [...model, this._preview].sort(([name1], [name2]) => name1 < name2 ? -1 : name1 > name2 ? 1 : 0);
    }
    const modelWithPreview = [...model];
    modelWithPreview.splice(previewIndex, 1, this._preview);
    return modelWithPreview;
  }


  _removeAttribute(name) {
    this._nodes.attributes[name].parentElement.remove();
    delete this._nodes.attributes[name];
  }


  _renderAttribute(attribute, index, model) {
    const attributeComponent = this._nodes.attributes[attribute[0]];
    if (attributeComponent) {
      if (this._isPreviewed(attribute)) {
        attributeComponent.preview(attribute, this._previewColor);
      } else {
        attributeComponent.model = attribute;
        attributeComponent.cancelPreview();
      }
    } else {
      this._renderNewAttribute(attribute, index, model);
    }
  }


  _renderNewAttribute(attribute, index, model) {
    const newAttribute = this._createAttribute(attribute);
    if (!this._isPreviewed(attribute)) { newAttribute.model = attribute; }
    this._nodes.attributes[attribute[0]] = newAttribute;
    const separatedAttribute = this._createSeparatedAttribute(newAttribute);

    if (index === 0) {
      this._nodes.container.insertAdjacentElement('afterbegin', separatedAttribute);
    } else {
      const previousAttributeComponent = this._nodes.attributes[model[index - 1][0]];
      previousAttributeComponent.parentElement.insertAdjacentElement('afterend', separatedAttribute);
    }

    if (this._isPreviewed(attribute)) { newAttribute.preview(this._preview, this._previewColor); }
  }


  _isPreviewed(attribute) {
    return this._preview && attribute[0] === this._preview[0];
  }


  _createAttribute() {
    return createElement('hpu-puzzle-attribute', { parentList: this._host });
  }


  _createSeparatedAttribute(attributeComponent) {
    return createElement('span', { className: 'hpu-puzzle-attribute-list__separated-attribute' }, [attributeComponent]);
  }

}
