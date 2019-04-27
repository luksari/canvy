import { combineReducers } from 'redux';
import { canvasReducer } from '../components/Canvas/duck/reducer'
import { toolbarReducer } from '../components/Toolbar/duck/reducer'


export default combineReducers({
    // Reducers existing in project
    canvasReducer: canvasReducer,
    toolbarReducer: toolbarReducer 
})
