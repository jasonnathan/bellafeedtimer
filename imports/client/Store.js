import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
// import thunk from 'redux-thunk';
import persist from '/imports/client/Middleware/persist';
import rootReducer from '/imports/client/Reducers/';

// create a logger
const logger = createLogger();
const middleware = [logger, persist];

const Store = createStore(rootReducer, {}, applyMiddleware(...middleware));
export default Store;
