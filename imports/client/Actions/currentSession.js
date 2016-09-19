/**
 * state = {
 *   currentSession
 * }
 */
import {
  Random
} from 'meteor/random';

export const START_RECORDING = "START_RECORDING";
export const STOP_RECORDING = "STOP_RECORDING";
export const UPDATE_RECORDING = "UPDATE_RECORDING";
export const DELETE_RECORDING = "DELETE_RECORDING";
export const SET_EDIT_RECORDING = "SET_EDIT_RECORDING";
export const UPDATE_RECORDING_DURATION = "UPDATE_RECORDING_DURATION";

/**
 * Begins a recording session. Generates an id and appends the current time.
 *
 * @param  {String} position Left or Right buttone pressed
 * @return {Object}          Returns an object with {type, _id, started, position}
 */
export function startRecording(position) {
  return {
    type: START_RECORDING,
    _id: Random.id(),
    position,
    started: new Date
  };
}

/**
 * Stops a recording with a given id and appends the current time
 *
 * @param  {String} _id The _id of the session (normally the one recording)
 * @return {Object}     Returns an object with {type, _id, ended}
 */
export function stopRecording(_id) {
  return {
    type: STOP_RECORDING,
    _id,
    ended: new Date
  }
}

export function updateRecording(session) {
  // started, ended, position, _id
  return Object.assign({}, {
    type: UPDATE_RECORDING
  }, session);
}

export function deleteRecording(_id) {
  return {
    type: DELETE_RECORDING,
    _id
  }
}

export function setEditRecording(_id) {
  return {
    type: SET_EDIT_RECORDING,
    _id
  };
}

export function updateRecordingDuration() {
  return {
    type: UPDATE_RECORDING_DURATION
  }
}
