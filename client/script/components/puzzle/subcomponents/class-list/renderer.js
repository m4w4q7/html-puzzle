import { getListDifference } from '../../utils.js';
import { createElement } from '../../../../utils.js';
import { HighlightColors } from '../../enums.js';

export class ClassListRenderer {

  constructor(host) {
    this._host = host;
    this._nodes = null;
    this._preview = null;
    this._previewColor = null;
    this._renderClass = this._renderClass.bind(this);
  }


  render(nodes, { model, preview, previewColor }) {
    this._nodes = { ...nodes, classes: { ...nodes.classes } };
    this._preview = preview;
    this._previewColor = previewColor;

    const modelWithPreview = this._preview ? model.listWithPreview(preview) : model.list();
    modelWithPreview.forEach(this._renderClass);

    const unusedClasses = getListDifference(Object.keys(this._nodes.classes), modelWithPreview);
    unusedClasses.forEach(className => this._removeClass(className));
    return this._nodes;
  }


  _renderClass(className, index, classesToRender) {
    if (!this._nodes.classes[className]) {
      this._nodes.classes[className] = this._createClass(className);
      if (index === 0) {
        this._nodes.container.insertAdjacentElement('afterbegin', this._nodes.classes[className]);
      } else {
        const previousClass = this._nodes.classes[classesToRender[index - 1]];
        previousClass.insertAdjacentElement('afterend', this._nodes.classes[className]);
      }
    }
    const highlightColor = className === this._preview ? this._previewColor : HighlightColors.NONE;
    this._nodes.classes[className].highlight(highlightColor);
  }


  _createClass(className) {
    return createElement('hpu-puzzle-class', { value: className, parentList: this._host });
  }


  _removeClass(className) {
    this._nodes.classes[className].remove();
    delete this._nodes.classes[className];
  }

}
