import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import {Recordings} from '../RecordingCollection';

Meteor.publish("fetchToday", () => {
  return Recordings.find({_id: moment().format('YYYYMMDD')});
})
