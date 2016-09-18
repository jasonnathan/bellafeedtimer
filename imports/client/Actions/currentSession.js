/**
 * state = {
 *    currentMonth, currentDay, currentRecording
 * }
 */
import {
  Random
} from 'meteor/random';

export const START_RECORDING = "START_RECORDING";

export function startRecording(position) {
  const _ret = {
      started: new Date,
      _id: Random.id(),
    },
    {
      started,
      _id
    } = _ret;

  return {
    type: START_RECORDING,
    _id,
    position,
    started
  };
}

export const STOP_RECORDING = "STOP_RECORDING";

export function stopRecording(_id) {
  const _ret = Object.assign({}, {
      ended: new Date,
      _id
    }),
    {
      ended
    } = _ret;

  return {
    type: STOP_RECORDING,
    _id,
    ended
  }
}

export const UPDATE_RECORDING = "UPDATE_RECORDING";

export function updateRecording(session) {
  // started, ended, position, _id
  return Object.assign({}, {
    type: UPDATE_RECORDING
  }, session);
}

export const DELETE_RECORDING = "DELETE_RECORDING";

export function deleteRecording(_id) {
  return {
    type: DELETE_RECORDING,
    _id
  }
}

export const SET_EDIT_RECORDING = "SET_EDIT_RECORDING";

export function setEditRecording(_id) {
  return {
    type: SET_EDIT_RECORDING,
    _id
  };
}

export const SET_SUCCESS_RECORDING = "SET_SUCCESS_RECORDING";

export function setSuccessFulRecording(actionType, currentSession) {
  return {
    type: SET_SUCCESS_RECORDING,
    requestType: actionType,
    currentSession,
    recievedAt: Date.now()
  }
}

export const SET_ERROR_RECORDING = "SET_ERROR_RECORDING";

export function setErrorRecording(actionType, currentSession) {
  return {
    type: SET_ERROR_RECORDING,
    requestType: actionType,
    currentSession,
    recievedAt: Date.now()
  }
}

export const UPDATE_RECORDING_DURATION = "UPDATE_RECORDING_DURATION";

export function updateRecordingDuration() {
  return {
    type: UPDATE_RECORDING_DURATION
  }
}
