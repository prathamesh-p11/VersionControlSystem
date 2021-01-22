/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: redux store
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import state from './state';

const store = createStore(rootReducer, state, applyMiddleware(thunk));

export default store;
