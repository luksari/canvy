import { createStandardAction } from 'typesafe-actions';

import { START_DRAWING, END_DRAWING, DRAWING, CREATE_LINE, ADD_LINE } from './constants'
import { Point, Line } from 'MyModels';

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
export const createLine = createStandardAction(CREATE_LINE)
        .map(
            (point: Point) => ({
                payload: { point }
            })
        )
export const addLine = createStandardAction(ADD_LINE)
    .map(
        (line: Line) => ({
            payload: { line }
        })
)
