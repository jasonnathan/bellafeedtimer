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

export function updateInToday(payload) {
  return {
    type: UPDATE_TODAY,
    payload
  }
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

      return currentDay && dispatch({
        type: RECEIVED_TODAY,
        currentDay
      })
    })
  }
}
