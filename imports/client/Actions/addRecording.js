import {Meteor} from 'meteor/meteor';
import pattern from '/imports/api/sessionValidator.js';
import {check} from 'meteor/check';

export default function addRecording(session){
  check(session, pattern);
  return ()  => {
    Meteor.call('START_RECORDING', session);
  }
}
