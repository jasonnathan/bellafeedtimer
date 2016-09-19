import {Meteor} from 'meteor/meteor';
import diff from 'object-diff';

const persist = store => next => action => {
  const prev = store.getState();
  let result = next(action);
  let nextState = store.getState();
  Meteor.call('updateState', {
    action,
    diff: {
      currentSession: diff(prev.currentSession, nextState.currentSession),
      currentDay: diff(prev.currentDay, nextState.currentDay)
    },
    next: nextState
  }, () => result);
}
export default persist;
