import { createStandardAction } from 'typesafe-actions';

import { START_DRAWING, END_DRAWING, DRAWING } from './constants'

export const startDrawing = createStandardAction(START_DRAWING)<Position>();
export const endDrawing = createStandardAction(END_DRAWING)<Position>();