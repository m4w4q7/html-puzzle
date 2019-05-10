import { AbstractPuzzleSubcomponent } from '../abstract-puzzle-subcomponent/index.js';
import { HighlightColors } from '../../enums.js';
import { reflow } from '../../utils.js';
import { AbstractMemberAccessError } from '../../../../errors/abstract-member-access-error.js';

export class AbstractPuzzlePiece extends AbstractPuzzleSubcomponent {

  highlight(color) {
    const colorValue = colorMap[color];
    const currentColorValue = this.getAttribute('highlight');
    if (currentColorValue === colorValue || (!colorValue && currentColorValue === null)) { return; }

    reflow(this);
    colorValue ? this.setAttribute('highlight', colorValue) : this.removeAttribute('highlight');
  }


  get pieceType() {
    throw new AbstractMemberAccessError();
  }

}


const colorMap = {
  [HighlightColors.NEUTRAL]: 'neutral',
  [HighlightColors.ADD]: 'add',
  [HighlightColors.REMOVE]: 'remove',
  [HighlightColors.CONTAINER]: 'container',
};
