import { combineReducers } from 'redux';

import { RootAction } from 'MyTypes';
import { ActionType } from 'typesafe-actions';
import * as constants from './constants'
import * as canvas from './actions';
import { Point, Line } from 'MyModels';


export type CanvasState = {
    isDrawing: boolean,
    prevPoint: Point,
    lines: Array<Line>

}
export type CanvasAction = ActionType<typeof canvas>

export const canvasReducer = combineReducers<CanvasState, RootAction>({
    isDrawing: (state : boolean = false, action : CanvasAction) => {
        const { START_DRAWING, DRAWING, END_DRAWING } = constants
        switch(action.type) {
            case START_DRAWING:
                return action.payload.isDrawing
            case DRAWING:
                return action.payload.isDrawing
            case END_DRAWING:
                return action.payload.isDrawing
            default:
                return state
        }
    },
    prevPoint: (state: Point = {x: 0, y: 0}, action : CanvasAction) => {
        const { START_DRAWING, DRAWING, END_DRAWING } = constants
        switch(action.type) {
            case START_DRAWING:
                return action.payload.prevPoint
            case DRAWING:
                return action.payload.prevPoint
            case END_DRAWING:
                return action.payload.prevPoint
            default:
                return state
        }
    },
    lines: (state: Array<Line> = [], action : CanvasAction) => {
        const {  CREATE_LINE } = constants
        switch(action.type) {
            case CREATE_LINE:
                return [...state, action.payload.line]
            default:
                return state
        }
    }
})