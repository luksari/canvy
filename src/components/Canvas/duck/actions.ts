import { createStandardAction } from 'typesafe-actions';

import { START_DRAWING, END_DRAWING, DRAWING } from './constants'
import { Point } from 'MyModels';

export const startDrawing = createStandardAction(START_DRAWING)
    .map(
        (point: Point) => ({
            payload: { point, isDrawing: true }
        })
    );
export const drawing = createStandardAction(DRAWING)
    .map(
        (point: Point) => ({
            payload: { point, isDrawing: true}
        })
    )
export const endDrawing = createStandardAction(END_DRAWING)
    .map(
        (point: Point) => ({
            payload: { point, isDrawing: false }
        })
    );
