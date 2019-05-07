import rootReducer from './rootReducer'

import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const enhancer = composeWithDevTools()
export const store = createStore(rootReducer, enhancer)
