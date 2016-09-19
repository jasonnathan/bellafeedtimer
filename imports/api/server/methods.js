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

import moment from 'moment';

import {
  Recordings
} from '../RecordingCollection';

const State = new Mongo.Collection('state');
Meteor.methods({
  updateState(_obj) {
    check(_obj, Object);
    return State.insert({..._obj, ts: new Date});
  },
  fetchToday() {
    console.log(Recordings.findOne({_id: moment().format('YYYYMMDD')}));
    return Recordings.findOne({_id: moment().format('YYYYMMDD')})
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
