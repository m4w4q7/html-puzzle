import { pick } from '../utils.js';

export const calculateHint = (current, target) => {
  const targetFlatPieces = flattenPieces(target);
  const unmatchedCurrentFlatPieces = flattenPieces(current);

  const targetPiece = targetFlatPieces.find(targetPiece => !popSamePieceAtSameLocation(unmatchedCurrentFlatPieces, targetPiece));
  if (!targetPiece) { return null; }

  const currentPiece = findPieceAnywhere(unmatchedCurrentFlatPieces, targetPiece);

  return {
    type: currentPiece.type,
    value: currentPiece.value,
    from: pick(['path', 'hostAttribute'], currentPiece),
    to: pick(['path', 'hostAttribute'], targetPiece),
   };
};


const flattenPieces = (blocks, path = []) => blocks.reduce((flatPieces, block, index) => {
  return [...flatPieces, ...getPiecesFromBlock(block, [...path, index])];
}, []);


const getPiecesFromBlock = (block, path) => {
  return block.type === 'text' ?
    [createTextPiece(block, path)] :
    [
      createElementPiece(block, path),
      ...(block.id ? [createIdPiece(block, path)]: []),
      ...createClassPieces(block, path),
      ...createAttributePieces(block, path),
      ...flattenPieces(block.children, path)
    ];
};


const createTextPiece = ({ text }, path) => ({ type: 'text', path, value: text });
const createElementPiece = ({ tagName }, path) => ({ type: 'element', path, value: tagName });
const createIdPiece = ({ id }, path) => ({ type: 'id', path, value: id });

const createClassPieces = ({ classList }, path) =>
  classList.map(className => ({ type: 'class', path, value: className }));

const createAttributePieces = ({ attributes }, path) => attributes.reduce((pieces, [name, value]) => {
  pieces.push({ type: 'attribute', path, value: name }, { type: 'attributeValue', path, hostAttribute: name, value });
  return pieces;
}, []);


const popSamePieceAtSameLocation = (pieces, samplePiece) => {
  const indexOfSamePiece = pieces
    .findIndex(piece => isSamePiece(piece, samplePiece) && isAtSameLocation(piece, samplePiece));
  return indexOfSamePiece > -1 ? pieces.splice(indexOfSamePiece, 1)[0] : null;
};


const findPieceAnywhere = (pieces, samplePiece) => pieces.find(piece => isSamePiece(piece, samplePiece));


const isSamePiece = (piece1, piece2) => piece1.type === piece2.type && piece1.value === piece2.value;


const isAtSameLocation = (piece1, piece2) =>
  isEqualArray(piece1.path, piece2.path) && piece1.hostAttribute === piece2.hostAttribute;


const isEqualArray = (array1, array2) =>
  array1.length === array2.length && array1.every((element, index) => element === array2[index]);
