import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';

import rootRedducer from "./rootReducer";

export const middlewares = [thunk, logger];

export const store = createStore(rootRedducer, applyMiddleware(...middlewares));

export default store;