// /*global describe it before after*/
// import {
//   Meteor
// } from 'meteor/meteor';
// import moment from 'moment';
// import expect from 'expect';
// import {Recordings} from './RecordingCollection.js';
// import Session from '/imports/api/Session.js';
// import './methods.js'
//
// const createSession = (_obj) => {
//   let _s = new Session(_obj);
//   return _s.toJS;
// }
// const cleanUp = () => Recordings.remove({});
//
// describe("Meteor methods", function () {
//   before(cleanUp);
//   after(cleanUp);
//   it("should throw if an empty object was passed to `START_RECORDING`", function () {
//     expect(() => Meteor.call('START_RECORDING', {}))
//       .toThrow(Error, "Passing an empty object to `START_RECORDING` should throw");
//   });
//   it("should not throw if an object with a valid position key was passed to `START_RECORDING`", function () {
//     expect(() => Meteor.call('START_RECORDING', createSession({
//         position: 'LEFT'
//       })))
//       .toNotThrow(Error, "Passing an object with a valid position key to `START_RECORDING` should not throw");
//   });
//   it("should throw if an empty object was passed to `UPDATE_RECORDING`", function () {
//     expect(() => Meteor.call('UPDATE_RECORDING', {}))
//       .toThrow(Error, "Passing an empty object to `UPDATE_RECORDING` should throw");
//   });
//   it("should throw if an object without a valid `_id` is given to UPDATE_RECORDING", function () {
//     expect(() => Meteor.call('UPDATE_RECORDING', {
//         position: 'LEFT'
//       }))
//       .toThrow(Error, "Passing an object without an `_id` to `UPDATE_RECORDING` should throw");
//   })
//   it("should throw if an object with an invalid `started` is given to UPDATE_RECORDING", function () {
//
//     expect(() => Meteor.call('UPDATE_RECORDING', {
//         "_id": "BciQaR3du86M2Fe7p",
//         started: undefined
//       }))
//       .toThrow(Error, "Passing an object with an invalid `started` to `UPDATE_RECORDING` should throw");
//   });
//   it("should throw if an object with an invalid `ended` is given to UPDATE_RECORDING", function () {
//     expect(() => Meteor.call('UPDATE_RECORDING', {
//         "_id": "BciQaR3du86M2Fe7p",
//         ended: undefined
//       }))
//       .toThrow(Error, "Passing an object with an invalid `ended` to `UPDATE_RECORDING` should throw");
//   });
//
//   it("should throw if an empty object was passed to `DELETE_RECORDING`", function () {
//     expect(() => Meteor.call('DELETE_RECORDING', {}))
//       .toThrow(Error, "Passing an empty object to `DELETE_RECORDING` should throw");
//   });
//   it("should throw if an object without a valid `_id` is given to DELETE_RECORDING", function () {
//     expect(() => Meteor.call('UPDATE_RECORDING', 'random string'))
//       .toThrow(Error, "Passing an object without an `_id` to `DELETE_RECORDING` should throw");
//   });
// });
