import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function deleteRecording(id){
  check(id, String);
  return ()  => {
    Meteor.call('DELETE_RECORDING', id);
  }
}
