import { combineReducers } from 'redux';

import { RootAction } from 'MyTypes';
import { ActionType } from 'typesafe-actions';
import * as constants from './constants'
import * as canvas from './actions';


export type CanvasState = {
    isDrawing: boolean,
    // @TODO refactor lines to own model
    // lines: Array<Array<Position>>
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
                return state;
        }
    },
    // lines: (state = [], action) => {

    // }
})