import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import * as toolbar from './actions';
import * as constants from './constants';

export interface ToolbarState {
  color: string;
  thickness: number;
  resetFlag: boolean;
  isPencil: boolean;
  isErase: boolean;
}

export type ToolbarAction = ActionType<typeof toolbar>;

export const toolbarReducer = combineReducers<ToolbarState, ToolbarAction>({
  color: (state: string = '#BADA55', action: ToolbarAction) => {
    const { SELECT_COLOR } = constants;
    switch (action.type) {
      case SELECT_COLOR:
        return action.payload;
      default:
        return state;
    }
  },
  thickness: (state: number = 1, action: ToolbarAction) => {
    const { SELECT_THICKNESS } = constants;
    switch (action.type) {
      case SELECT_THICKNESS:
        return action.payload;
      default:
        return state;
    }
  },
  resetFlag: (state: boolean = false, action: ToolbarAction) => {
    const { RESET_CANVAS } = constants;
    switch (action.type) {
      case RESET_CANVAS:
        return action.payload;
      default:
        return state;
    }
  },
  isPencil: (state: boolean = true, action: ToolbarAction) => {
    const { SELECT_PENCIL, SELECT_ERASE } = constants;
    switch (action.type) {
      case SELECT_PENCIL:
        return true;
      case SELECT_ERASE:
        return false;
      default:
        return state;
    }
  },
  isErase: (state: boolean = false, action: ToolbarAction) => {
    const { SELECT_ERASE, SELECT_PENCIL } = constants;
    switch (action.type) {
      case SELECT_PENCIL:
        return false;
      case SELECT_ERASE:
        return true;
      default:
        return state;
    }
  },
});
