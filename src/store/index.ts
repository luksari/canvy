import { rootReducer } from './rootReducer'

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';

const enhancer = composeWithDevTools();
export const store = createStore(rootReducer, enhancer)
