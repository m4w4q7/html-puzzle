export const PieceTypes = {
  TEXT: Symbol('text'),
  ELEMENT: Symbol('element'),
  ID: Symbol('id'),
  CLASS: Symbol('class'),
  ATTRIBUTE: Symbol('attribute'),
  ATTRIBUTE_VALUE: Symbol('attributeValue')
};


export const DragStates = {
  HOVER: Symbol('hover'),
  BEFORE_DRAG: Symbol('beforeDrag'),
  DRAG: Symbol('drag'),
  AFTER_DRAG: Symbol('afterDrag')
};

export const HighlightColors = {
  NEUTRAL: Symbol('neutral'),
  ADD: Symbol('add'),
  NONE: Symbol('none')
};
