import {Meteor} from 'meteor/meteor'; // eslint-disable-line
import {Mongo} from 'meteor/mongo'; // eslint-disable-line
import {check} from 'meteor/check'; // eslint-disable-line

import moment from 'moment';

import {Recordings} from '../RecordingCollection';

const State: Object = new Mongo.Collection('state');
let _initialising: Boolean = true;

Meteor.methods({
  updateState(_obj: Object = {}) {
    check(_obj, Object);
    return State.insert({
      ..._obj,
      ts: new Date
    });
  },
  fetchToday(): ?Object {
    return Recordings.findOne({_id: moment().format('YYYYMMDD')})
  }
});

State.find().observe({
  added(doc: Object = {}) {
    const type: String = doc.action.type,
      cs: Object = doc.next.currentSession,
      sessionsPrevious: Array = doc.prev.currentDay.sessions,
      sessionsCurrent: Array = doc.next.currentDay.sessions;

    if (!_initialising)
      switch (type) {
        case 'START_RECORDING':
          return Recordings.insertSession(cs);
        case 'STOP_RECORDING':
        case 'UPDATE_RECORDING':
          return Recordings.updateSession(cs);
        case 'DELETE_RECORDING':{
          // since this action is performed on a day document, we need to
          // extract the difference between the previous and current session
          // arrays in order to extract the ids and durations of the respective
          // Alternatively, a simple findAndModify would have done the job,
          // but meteor doesn't expose it and I am just lazy...
          let d = sessionsPrevious.filter(i => sessionsCurrent.indexOf(i) < 0);
          if(d.length){
            return Recordings.removeSession(d[0]);
          }
        }

      }
    }
});

_initialising = false;
