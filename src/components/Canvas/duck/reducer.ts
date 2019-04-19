import { combineReducers } from 'redux';

import { RootAction } from 'MyTypes';
import { action, getType, ActionType } from 'typesafe-actions';
import * as constants from './constants'
import * as canvas from './actions';


export type CanvasState = {
    isDrawing: Boolean,
    // @TODO refactor lines to own model
    // lines: Array<Array<Position>>
}
export type CanvasAction = ActionType<typeof canvas>

export const canvasReducer = combineReducers<CanvasState, RootAction>({
    isDrawing: (state : Boolean = false, action : CanvasAction) => {
        const { START_DRAWING, DRAWING, END_DRAWING } = constants
        const { isDrawing } = action.payload
        switch(action.type) {
            case START_DRAWING:
                return isDrawing
            case DRAWING:
                return isDrawing
            case END_DRAWING:
                return isDrawing
            default:
                return state;
        }
    },
    // lines: (state = [], action) => {

    // }
})