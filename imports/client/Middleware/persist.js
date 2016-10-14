import {Meteor} from 'meteor/meteor'; // eslint-disable-line

/**
 * Downsizes objects inside session arrays so they only contain the info required
 * to perform the action
 * @type {Object}
 */
const pruneArraysInObj : Object = (_obj : Object = {}) => {
  // extract all the keys of this object
  let keys : Array = Object.keys(_obj),
    // get the total length of the keys array
    len : Number = keys.length - 1,
    // make a copy of the object
    ret : Object = Object.assign({}, _obj),
    // placeholder in case we detect an array in the loop
    val : ?Array,
    // for iterating the keys array
    i : Number = 0;

  // loop through all the keys
  for (i; i <= len - 1; i++) {
    // extract each value into `val`
    val = ret[keys[i]];
    // if it is a non-empty array
    if (Array.isArray(val) && val.length) {
      // replace the object with a simplified, pruned version.
      ret[keys[i]] = val.map(o => ({_id: o._id, duration: o.duration}));
    }
  }
  // return the new object
  return ret;
}

const persist : Function = (store : Object) => (next : Function) => (action : Object) => {
  const prev: Object = store.getState();
  let result: Object = next(action),
    nextState: Object = store.getState(),
    currentSession: Object = pruneArraysInObj(prev.currentSession),
    currentDay: Object = pruneArraysInObj(prev.currentDay)
  Meteor.call('updateState', {
    action,
    prev: {currentSession, currentDay},
    next: nextState
  }, () => result);
}
export default persist;
