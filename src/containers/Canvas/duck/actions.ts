import { createStandardAction } from 'typesafe-actions'

import { Point } from 'MyModels'
import { ADD_LINE, CREATE_LINE, DRAWING, END_DRAWING, START_DRAWING } from './constants'

export const startDrawing = createStandardAction(START_DRAWING).map((prevPoint: Point) => ({
  payload: { prevPoint, isDrawing: true },
}))
export const drawing = createStandardAction(DRAWING).map((prevPoint: Point) => ({
  payload: { prevPoint, isDrawing: true },
}))
export const endDrawing = createStandardAction(END_DRAWING).map((prevPoint: Point) => ({
  payload: { prevPoint, isDrawing: false },
}))
export const createLine = createStandardAction(CREATE_LINE).map((point: Point) => ({
  payload: { point },
}))
export const addLine = createStandardAction(ADD_LINE).map((line: Point[]) => ({
  payload: { line },
}))
