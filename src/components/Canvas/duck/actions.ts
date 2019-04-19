import { createStandardAction } from 'typesafe-actions';

import { START_DRAWING, END_DRAWING, DRAWING } from './constants'

export const startDrawing = createStandardAction(START_DRAWING)
    .map(
        (position: Position) => ({
            payload: { position, isDrawing: true }
        })
    );
export const drawing = createStandardAction(DRAWING)
    .map(
        (position: Position) => ({
            payload: { position, isDrawing: true}
        })
    )
export const endDrawing = createStandardAction(END_DRAWING)
    .map(
        (position: Position) => ({
            payload: { position, isDrawing: false }
        })
    );
