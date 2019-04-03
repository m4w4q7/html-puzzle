import { compose } from './compose.js';
import { decompose } from './decompose.js';

export const shuffle = (input) => {
  const parts = decompose(input);
  return compose(parts);
};
