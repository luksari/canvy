import { combineReducers } from 'redux';
import { canvasReducer } from '../components/Canvas/duck'


export const rootReducer = combineReducers({
    // Reducers existing in project
    canvasReducer: canvasReducer.canvasReducer
})
