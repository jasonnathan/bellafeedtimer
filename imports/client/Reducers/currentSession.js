import _ from 'underscore';
import moment from 'moment';
import {
  START_RECORDING,
  STOP_RECORDING,
  UPDATE_RECORDING
} from '../Actions/currentSession';

const humanize = require('humanize-duration')
  .humanizer({
    language: 'shortEn',
    languages: {
      shortEn: {
        y: () => 'y',
        mo: () => 'mo',
        w: () => 'w',
        d: () => 'd',
        h: () => 'h',
        m: () => 'm',
        s: () => 's',
        ms: () => 'ms'
      }
    },
    round: true,
    spacer: ''
  })

export default function currentSession(state = {
  recording: false
}, action) {
  let {
    position,
    started,
    ended,
    _id
  } = action;
  let mStart = moment(started || state.started),
    mEnd = moment(ended || state.ended),
    duration = mEnd.diff(mStart, true),
    durationText = humanize(duration || 0);

  switch (action.type) {
    case START_RECORDING:
      return _.defaults({
        _id,
        position,
        started,
        recording: true
      }, state);
    case STOP_RECORDING:
      return Object.assign({
        _id, position, started, ended
      }, state, {
        recording: false,
        startTime: mStart.format("LT"),
        endTime: mEnd.format("LT"),
        duration, durationText
      });
    case UPDATE_RECORDING:
      return Object.assign({
        _id, position, started, ended
      }, state, {
        recording: false,
        startTime: mStart.format("LT"),
        endTime: mEnd.format("LT"),
        duration, durationText
      });
  }
  return state;
}
