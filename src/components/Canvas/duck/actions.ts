import { createStandardAction } from 'typesafe-actions';

import { START_DRAWING, END_DRAWING, DRAWING } from './constants'
import { Point } from 'MyModels';

export const startDrawing = createStandardAction(START_DRAWING)
    .map(
        (prevPoint : Point) => ({
            payload: { prevPoint, isDrawing: true }
        })
    );
export const drawing = createStandardAction(DRAWING)
    .map(
        (prevPoint : Point) => ({
            payload: { prevPoint, isDrawing: true}
        })
    )
export const endDrawing = createStandardAction(END_DRAWING)
    .map(
        (prevPoint : Point) => ({
            payload: { prevPoint, isDrawing: false }
        })
    );
