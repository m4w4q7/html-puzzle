import { Text } from '../model/text.js';
import { PieceTypes } from '../enums/piece-types.js';
import { Piece } from './piece.js';


export class HintCalculator {

  constructor(target) {
    this._targetFlatPieces = this._flattenPieces(target);
  }

  getNext(current) {
    const unmatchedCurrentFlatPieces = this._flattenPieces(current);

    const targetPiece = this._targetFlatPieces.find(targetPiece => {
      return !this._popSamePieceAtSameLocation(unmatchedCurrentFlatPieces, targetPiece);
    });
    if (!targetPiece) { return null; }

    const currentPiece = this._findPieceAnywhere(unmatchedCurrentFlatPieces, targetPiece);

    return {
      type: currentPiece.type,
      value: currentPiece.value,
      from: currentPiece.path,
      to: targetPiece.path
     };
  }


  _flattenPieces(blockList, path = []) {
    return blockList.list().reduce((flatPieces, block, index) => {
      return [...flatPieces, ...this._getPiecesFromBlock(block, [...path, index])];
    }, []);
  }


  _getPiecesFromBlock(block, path) {
    return block instanceof Text ?
      [this._createTextPiece(block, path)] :
      [
        this._createElementPiece(block, path),
        ...(block.id ? [this._createIdPiece(block, path)]: []),
        ...this._createClassPieces(block, path),
        ...this._createAttributePieces(block, path),
        ...this._flattenPieces(block.children, path)
      ];
  }


  _createTextPiece(text, path) {
    return new Piece(PieceTypes.TEXT, text.content, path);
  }


  _createElementPiece(element, path) {
    return new Piece(PieceTypes.ELEMENT, element.name, path);
  }


  _createIdPiece(element, path) {
    return new Piece(PieceTypes.ID, element.id, path);
  }


  _createClassPieces(element, path) {
    return element.classList.list().map(className => new Piece(PieceTypes.CLASS, className, path));
  }


  _createAttributePieces(element, path) {
    return element.attributeList.list().reduce((pieces, attribute) => {
      const attributePiece = new Piece(PieceTypes.ATTRIBUTE, attribute.name, path);
      const attributeValuePiece = new Piece(PieceTypes.ATTRIBUTE_VALUE, attribute.value, [...path, attribute.name]);
      pieces.push(attributePiece, attributeValuePiece);
      return pieces;
    }, []);
  }


  _popSamePieceAtSameLocation(pieces, samplePiece) {
    const indexOfSamePiece = pieces.findIndex(piece => piece.isInCorrectPlace(samplePiece));
    return indexOfSamePiece > -1 ? pieces.splice(indexOfSamePiece, 1)[0] : null;
  }


  _findPieceAnywhere(pieces, samplePiece) {
    return pieces.find(piece => piece.isSame(samplePiece));
  }

}
