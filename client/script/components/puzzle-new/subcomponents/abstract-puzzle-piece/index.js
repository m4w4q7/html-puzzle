import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { highlightColors } from '../../enums.js';

export class AbstractPuzzlePiece extends AbstractPuzzleSubcomponent {

  highlight(color) {
    const colorValue = colorMap[color];
    colorValue ? this.setAttribute('highlight', colorValue) : this.removeAttribute('highlight');
  }

}


const colorMap = {
  [highlightColors.neutral]: 'neutral',
  [highlightColors.add]: 'add',
};
