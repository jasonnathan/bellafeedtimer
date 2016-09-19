import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import persist from '/imports/client/Middleware/persist';
import rootReducer from '/imports/client/Reducers/';

// create a logger
const logger = createLogger();
const middleware = [thunk, logger, persist];

const Store = createStore(rootReducer, {}, applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f);
export default Store;
