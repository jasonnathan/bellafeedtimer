import moment from 'moment';
import Humanize from '/imports/helpers/Humanize';
import {
  START_RECORDING,
  STOP_RECORDING,
  UPDATE_RECORDING_DURATION,
  UPDATE_RECORDING,
  UNSET_CURRENT_RECORDING
} from '../Actions/currentSession';


export default function currentSession(state = {
  recording: false
}, action) {
  let { position, started, ended, _id } = action;
  let mStart = moment(started || state.started),
    mEnd = moment(ended || state.ended),
    duration = mEnd.diff(mStart, true),
    durationText = Humanize(duration || 0);

  switch (action.type) {
    case START_RECORDING:
      return {
        _id, position, started, recording: true
      };
    case STOP_RECORDING:
      return {
        _id, position, started, ended, ...state,
        recording: false,
        startTime: mStart.format("LT"),
        endTime: mEnd.format("LT"),
        duration, durationText
      };
      case UPDATE_RECORDING:
        return {
          _id, position, started, ended, ...state,
          recording: false,
          startTime: mStart.format("LT"),
          endTime: mEnd.format("LT"),
          duration, durationText
        };
    case UPDATE_RECORDING_DURATION:
      return {
        _id, position, started, ...state,
        recording: true,
        startTime: mStart.format("LT"),
        duration: moment().diff(moment(mStart)),
        durationText: Humanize(moment().diff(moment(mStart)))
      };
    // when a recording is deleted from the current day, this must return an
    // empty object so that recording won't continue and total duration
    // is valid
    case UNSET_CURRENT_RECORDING:{
      return {recording: false};
    }
  }
  return state;
}
