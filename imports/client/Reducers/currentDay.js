import moment from 'moment';
import reject from 'lodash.reject';
import map from 'lodash.map';
import {
  REQUESTED_TODAY,
  RECEIVED_TODAY,
  ERROR_FETCHING_TODAY,
  DELETE_RECORDING,
  SET_EDIT_RECORDING,
  UPDATE_TODAY
} from '../Actions/currentDay';

export default function currentDay(state = {
  _id: moment()
    .format('YYYYMMDD'),
  sessions: [],
  counts: {
    duration: 0,
    recordings: 0
  },
  isFetching: false,
  isError: false,
  err: null
}, action) {
  switch (action.type) {
  case REQUESTED_TODAY:
    return {...state,
      isFetching: true,
      isError: false,
      err: null
    };
  case RECEIVED_TODAY:
    return {...state,
      ...action.currentDay || state,
      isError: false,
      isFetching: false,
      err: null
    }
  case ERROR_FETCHING_TODAY:
    return {...state,
      isError: true,
      err: action.err
    }
  case UPDATE_TODAY:
    return {
      ...state,
      ...action.payload
    }
  case DELETE_RECORDING:
    return {
      ...state,
      sessions: reject(state.sessions, s => s._id === action._id)
    }
  }
  return state;
}
