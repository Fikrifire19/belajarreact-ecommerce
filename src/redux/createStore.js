import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootRedducer from "./rootReducer";

export const middlewares = [logger];

export const store = createStore(rootRedducer, applyMiddleware(...middlewares));

export default store;