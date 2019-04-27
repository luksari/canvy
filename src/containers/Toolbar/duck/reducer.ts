
import { ActionType } from 'typesafe-actions';
import * as constants from './constants'
import * as toolbar from './actions';
import { combineReducers } from 'redux';

export type ToolbarState = {
    color: string,
    thickness: number,
}

export type ToolbarAction = ActionType<typeof toolbar>

export const toolbarReducer = combineReducers<ToolbarState, ToolbarAction>({
    color: (state : string = '#BADA55', action : ToolbarAction) => {
        const { SELECT_COLOR } = constants
        switch(action.type){
            case SELECT_COLOR: return action.payload;
            default: return state;
        }
    },
    thickness: (state: number = 3, action: ToolbarAction) => {
        const { SELECT_THICKNESS } = constants
        switch(action.type){
            case SELECT_THICKNESS: return action.payload;
            default: return state;
        }
    }
})