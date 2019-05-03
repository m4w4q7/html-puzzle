import { HighlightColors } from '../enums.js';
import { PieceTypes } from '../../../enums/piece-types.js';
import { getLast } from '../../../utils.js';

export class HintHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._componentsWithPreview = [];
    this._highlightedComponents = [];
  }


  observe() {
    this._state.observe('hint', this._onHintChange, this);
  }


  _onHintChange(hint, previousHint) {
    if (hint) {
      this._showHint(hint);
    } else {
      this._hideHint(previousHint);
    }
  }


  _showHint(hint) {
    if (hint.type === PieceTypes.TEXT || hint.type === PieceTypes.ELEMENT) { return this._showBlockHint(hint); }
    if (hint.type === PieceTypes.ID) { return this._showIdHint(hint); }
    if (hint.type === PieceTypes.CLASS) { return this._showClassHint(hint); }
    if (hint.type === PieceTypes.ATTRIBUTE) { return this._showAttributeHint(hint); }
    if (hint.type === PieceTypes.ATTRIBUTE_VALUE) { return this._showAttributeValueHint(hint); }
  }


  _showBlockHint(hint) {
    const fromComponent = this._getBlock(hint.from);
    const toComponent = this._getParentBlockList(hint.to);
    fromComponent.highlight(HighlightColors.REMOVE);
    toComponent.preview(getLast(hint.to), fromComponent.model, HighlightColors.ADD);
    this._highlightedComponents.push(fromComponent);
    this._componentsWithPreview.push(toComponent);
  }


  _showIdHint(hint) {
    const fromComponent = this._getBlock(hint.from).idComponent;
    const toComponent = this._getBlock(hint.to).idComponent;
    fromComponent.preview(hint.value, HighlightColors.REMOVE);
    toComponent.preview(hint.value, HighlightColors.ADD);
    this._componentsWithPreview.push(fromComponent, toComponent);
  }


  _showClassHint(hint) {
    const fromComponent = this._getBlock(hint.from).classListComponent;
    const toComponent = this._getBlock(hint.to).classListComponent;
    fromComponent.preview(hint.value, HighlightColors.REMOVE);
    toComponent.preview(hint.value, HighlightColors.ADD);
    this._componentsWithPreview.push(fromComponent, toComponent);
  }


  _showAttributeHint(hint) {
    const fromComponent = this._getBlock(hint.from).attributeListComponent;
    const toComponent = this._getBlock(hint.to).attributeListComponent;
    const model = fromComponent.model.getByName(hint.value).clone();
    fromComponent.preview(model, HighlightColors.REMOVE);
    toComponent.preview(model.clone(), HighlightColors.ADD);
    this._componentsWithPreview.push(fromComponent, toComponent);
  }


  _showAttributeValueHint(hint) {
    const fromComponent = hint.value ? this._getAttribute(hint.from) : this._getAttribute(hint.to);
    const toComponent = hint.value ? this._getAttribute(hint.to) : this._getAttribute(hint.from);
    fromComponent.valueComponent.highlight(HighlightColors.REMOVE);
    toComponent.highlight(HighlightColors.ADD);
    toComponent.valueComponent.highlight(HighlightColors.ADD);
    this._highlightedComponents.push(fromComponent.valueComponent, toComponent, toComponent.valueComponent);
  }


  _hideHint() {
    this._componentsWithPreview.splice(0).forEach(component => component.cancelPreview());
    this._highlightedComponents.splice(0).forEach(component => component.highlight(HighlightColors.NONE));
  }


  _getBlock(path) {
    return this._host.getBlockByPath(path);
  }


  _getParentBlockList(blockPath) {
    const path = blockPath.slice(0, -1);
    return path.length ? this._host.getBlockByPath(path).blockListComponent : this._host.blockListComponent;
  }


  _getAttribute(path) {
    const elementPath = path.slice(0, -1);
    return this._host.getBlockByPath(elementPath).attributeListComponent.getAttributeComponentByName(getLast(path));
  }

}
