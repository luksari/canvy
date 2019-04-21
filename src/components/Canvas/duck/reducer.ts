import { combineReducers } from 'redux';

import { RootAction } from 'MyTypes';
import { ActionType } from 'typesafe-actions';
import * as constants from './constants'
import * as canvas from './actions';


export type CanvasState = {
    isDrawing: boolean,
    prevX: number,
    prevY: number

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
    prevX: (state: number = 0, action: CanvasAction) => {
        const { START_DRAWING, DRAWING, END_DRAWING } = constants
        switch(action.type) {
            case START_DRAWING:
                return action.payload.prevX
            case DRAWING:
                return action.payload.prevX
            case END_DRAWING:
                return action.payload.prevX
            default:
                return state;
        }
    },
    prevY: (state: number = 0, action: CanvasAction) => {
        const { START_DRAWING, DRAWING, END_DRAWING } = constants
        switch(action.type) {
            case START_DRAWING:
                return action.payload.prevY
            case DRAWING:
                return action.payload.prevY
            case END_DRAWING:
                return action.payload.prevY
            default:
                return state
        }
    }
})