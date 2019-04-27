import { createStandardAction } from 'typesafe-actions';

import { SELECT_COLOR, SELECT_THICKNESS, ERASE } from './constants'

export const selectColor = createStandardAction(SELECT_COLOR).map( (color : string) => ({payload: color}))
export const selectThickness = createStandardAction(SELECT_THICKNESS).map( (thickness : number) => ({payload: thickness}))
export const erase = createStandardAction(ERASE)<void>();