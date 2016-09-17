import {Meteor} from 'meteor/meteor';
import diff from 'object-diff';

const persist = store => next => action => {
  const prev = store.getState();
  let result = next(action)
  Meteor.call('updateState', {
    action,
    diff: {
      currentSession: diff(prev.currentSession, store.getState().currentSession)
    },
    next: store.getState()
  }, () => result);
}
export default persist;
