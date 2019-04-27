import { combineReducers } from 'redux';
import { canvasReducer } from '../containers/Canvas/duck/reducer'
import { toolbarReducer } from '../containers/Toolbar/duck/reducer'


export default combineReducers({
    // Reducers existing in project
    canvasReducer: canvasReducer,
    toolbarReducer: toolbarReducer 
})
