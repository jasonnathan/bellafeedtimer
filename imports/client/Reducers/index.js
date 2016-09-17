import { combineReducers } from 'redux'
import currentSession from './currentSession';
import currentDay from './currentDay';

const rootReducer = combineReducers({
  currentSession,
  currentDay
});

export default rootReducer;
