import { dragTypes } from './enums.js';
import { classes, selectors } from './dom-identifiers.js';
import { getDragType, findAncestor } from './utils.js';

export class AttributeValueDragMoveHandler {

  constructor(host, state) {
    this._host = host;
    this._state = state;
    this._hostAttribute = null;
    this._currentDropTarget = null;
  }


  activate() {
    this._state.observe('isDragging', this._onIsDraggingChange, this);
    this._host.addEventListener('mouseover', this._handleMouseOver.bind(this));
  }


  _onIsDraggingChange(isDragging) {
    if (this._state.dragType !== dragTypes.attributeValue) { return; }

    if (isDragging) {
      this._hostAttribute = this._getAttributeAncestor(this._state.draggedElement);
      this._currentDropTarget = null;
    } else {
      this._handleDrop();
    }
  }


  _handleMouseOver({ target }) {
    if (!this._state.isDragging || this._state.dragType !== dragTypes.attributeValue) { return; }
    const attributeAncestor = this._getAttributeAncestor(target);
    this._setDropTarget(attributeAncestor);
  }


  _setDropTarget(target) {
    if (target === this._currentDropTarget) { return; }
    if (this._currentDropTarget) { this._currentDropTarget.classList.remove(classes.attribteTarget); }
    this._currentDropTarget = target === this._hostAttribute ? null : target;
    if (this._currentDropTarget) { this._currentDropTarget.classList.add(classes.attribteTarget); }
  }


  _getAttributeAncestor(target) {
    return findAncestor(target, this._host, element => getDragType(element) === dragTypes.attribute);
  }


  _handleDrop() {
    if (!this._currentDropTarget) { return; }
    const targetAttributeValue = this._currentDropTarget.querySelector(selectors.attributeValue);
    if (targetAttributeValue) {
      targetAttributeValue.parentElement.replaceChild(this._state.draggedElement, targetAttributeValue);
      this._hostAttribute.appendChild(targetAttributeValue);
    } else {
      this._currentDropTarget.appendChild(this._state.draggedElement.previousSibling);
      this._currentDropTarget.appendChild(this._state.draggedElement);
    }

    this._setDropTarget(null);
  }

}
