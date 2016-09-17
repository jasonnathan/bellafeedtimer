/*global describe it before after*/
import expect from 'expect';
import {
  startRecording,
  stopRecording
} from '/imports/client/Actions/currentSession';
import Store from './Store.js';

let _cs = {};
Store.subscribe(() => {
  _cs = Store.getState()
    .currentSession;
})

describe("Global Store", function () {
  it("should return a valid `_id`, `started`, `recording` & `position` when START_RECORDING is called", function () {
    Store.dispatch(startRecording({
      position: "LEFT",
      started: new Date("2016-09-08T13:39:29.573Z")
    }));
    expect(_cs._id)
      .toBeA('string', '`_id` was expected to be a string, ' + typeof _cs._id + ' given instead');
    expect(_cs.started)
      .toBeA(Date, '`started` was expected to be a Date, ' + typeof _cs.started + ' given instead');
    expect(_cs.position)
      .toMatch(/^LEFT|^RIGHT/);
    expect(_cs.recording).toBeTruthy();
  });
  it("should return a valid `duration`, `ended` & `recording` when STOP_RECORDING is called", function () {
    Store.dispatch(stopRecording({
      _id: _cs._id,
      ended: new Date("2016-09-08T13:41:58.299Z")
    }));
    expect(_cs.ended)
      .toBeA(Date, '`ended` was expected to be a Date, ' + typeof _cs.ended + ' given instead');
    expect(_cs.recording)
      .toBe(false, '`recording` was expected to be false, ' + _cs.recording + ' given instead')
    expect(_cs.duration)
      .toBeA('number', '`duration` was expected to be a Number, ' + typeof _cs.duration + ' given instead')
  });
});
