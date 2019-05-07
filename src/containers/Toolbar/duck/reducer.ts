import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'
import * as toolbar from './actions'
import * as constants from './constants'

export interface ToolbarState {
  color: string
  thickness: number
}

export type ToolbarAction = ActionType<typeof toolbar>

export const toolbarReducer = combineReducers<ToolbarState, ToolbarAction>({
  color: (state: string = '#BADA55', action: ToolbarAction) => {
    const { SELECT_COLOR } = constants
    switch (action.type) {
      case SELECT_COLOR:
        return action.payload
      default:
        return state
    }
  },
  thickness: (state: number = 1, action: ToolbarAction) => {
    const { SELECT_THICKNESS } = constants
    switch (action.type) {
      case SELECT_THICKNESS:
        return action.payload
      default:
        return state
    }
  },
})
