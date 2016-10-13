/**
 * state = {
 *    currentDay
 * }
 */
import {
  Meteor
} from 'meteor/meteor';

export const REQUESTED_TODAY = "REQUESTED_TODAY";
export const RECEIVED_TODAY = "RECEIVED_TODAY";
export const ERROR_FETCHING_TODAY = "ERROR_FETCHING_TODAY";
export const UPDATE_TODAY = "UPDATE_TODAY";
export const UPDATE_RECORDING = "UPDATE_RECORDING";
export const DELETE_RECORDING = "DELETE_RECORDING";
export const SET_EDIT_RECORDING = "SET_EDIT_RECORDING";

export function updateInToday(payload) {
  return {
    type: UPDATE_TODAY,
    payload
  }
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


export function fetchTodayAsync() {
  return dispatch => {
    dispatch({
      type: REQUESTED_TODAY
    });
    Meteor.call('fetchToday', (err, currentDay) => {
      if (err)
        return dispatch({
          type: ERROR_FETCHING_TODAY,
          err
        });

      return dispatch({
        type: RECEIVED_TODAY,
        currentDay
      })
    })
  }
}
