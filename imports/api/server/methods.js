import {
  Meteor
} from 'meteor/meteor';
import {
  Mongo
} from 'meteor/mongo';
import {
  // Match,
  check
} from 'meteor/check';
import {
  Recordings
} from '../RecordingCollection';

// import pattern from '/imports/api/sessionValidator';
const State = new Mongo.Collection('state');
Meteor.methods({
  updateState(_obj) {
    check(_obj, Object);
    return State.insert(Object.assign({}, _obj, {
      ts: new Date
    }));
  }
});

State.find()
  .observe({
    added(doc) {
      const type = doc.action.type;
      switch (type) {
      case 'START_RECORDING':
        return Recordings.insertSession(doc.next.currentSession);
      case 'STOP_RECORDING':
      case 'UPDATE_RECORDING':
        return Recordings.updateSession(doc.next.currentSession);
      case 'DELETE_RECORDING':
        return Recordings.removeSession(doc.next.currentSession);
      }
    }
  })
