import { createStandardAction } from 'typesafe-actions';

import { SELECT_COLOR, SELECT_THICKNESS, RESET_CANVAS } from './constants';

export const selectColor = createStandardAction(SELECT_COLOR).map(
  (color: string) => ({
    payload: color,
  })
);
export const selectThickness = createStandardAction(SELECT_THICKNESS).map(
  (thickness: number) => ({
    payload: thickness,
  })
);
export const resetCanvas = createStandardAction(RESET_CANVAS).map(
  (resetFlag: boolean) => ({
    payload: resetFlag,
  })
);
