import { combineReducers } from 'redux';
import { canvasReducer } from '../components/Canvas/duck/reducer'


export const rootReducer = combineReducers({
    // Reducers existing in project
    canvasReducer: canvasReducer
})
