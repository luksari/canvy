import { Point, Dimensions } from 'MyModels';
import { combineReducers } from 'redux';
import { ActionType, action } from 'typesafe-actions';
import * as canvas from './actions';
import * as constants from './constants';

export interface CanvasState {
  isDrawing: boolean;
  prevPoint: Point;
  currentLine: Point[];
  lines: Point[][];
  dims: Dimensions;
}

export type CanvasAction = ActionType<typeof canvas>;

export const canvasReducer = combineReducers<CanvasState, CanvasAction>({
  isDrawing: (state: boolean = false, action: CanvasAction) => {
    const { START_DRAWING, END_DRAWING } = constants;
    switch (action.type) {
      case START_DRAWING:
        return true;
      case END_DRAWING:
        return false;
      default:
        return state;
    }
  },
  prevPoint: (
    state: Point = { x: 0, y: 0, color: '#BADA55', thickness: 1 },
    action: CanvasAction
  ) => {
    const { START_DRAWING, DRAWING, END_DRAWING } = constants;
    switch (action.type) {
      case START_DRAWING:
        return action.payload.prevPoint;
      case DRAWING:
        return action.payload.prevPoint;
      case END_DRAWING:
        return action.payload.prevPoint;
      default:
        return state;
    }
  },
  currentLine: (state: Point[] = [], action: CanvasAction) => {
    const { CREATE_LINE, START_DRAWING } = constants;
    switch (action.type) {
      case CREATE_LINE:
        return [...state, action.payload.point];
      case START_DRAWING:
        return [];
      default:
        return state;
    }
  },
  lines: (state: Point[][] = [], action: CanvasAction) => {
    const { ADD_LINE } = constants;
    switch (action.type) {
      case ADD_LINE:
        return [...state, action.payload.line];
      default:
        return state;
    }
  },
  dims: (
    state: Dimensions = {
      width: window.innerWidth,
      height: window.innerHeight * 0.8,
    },
    action: CanvasAction
  ) => {
    const { SET_DIMS } = constants;
    switch (action.type) {
      case SET_DIMS:
        return action.payload.dims;
      default:
        return state;
    }
  },
});
