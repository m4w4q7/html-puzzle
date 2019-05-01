import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { highlightColors } from '../../enums.js';
import { reflow } from '../../utils.js';

export class AbstractPuzzlePiece extends AbstractPuzzleSubcomponent {

  highlight(color) {
    const colorValue = colorMap[color];
    const currentColorValue = this.getAttribute('highlight');
    if (currentColorValue === colorValue || (!colorValue && currentColorValue === null)) { return; }

    reflow(this);
    colorValue ? this.setAttribute('highlight', colorValue) : this.removeAttribute('highlight');
  }

}


const colorMap = {
  [highlightColors.neutral]: 'neutral',
  [highlightColors.add]: 'add',
};
