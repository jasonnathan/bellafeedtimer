/*global describe it before*/
import moment from 'moment';
import assert from 'assert';
import RecordingCollection from '../RecordingCollection.js';
import {Random} from 'meteor/random';

const Recordings = new RecordingCollection('recordings');

const session = {
    "position": "LEFT",
    "_id": "BciQaR3du86M2Fe7p",
    "started": moment("2016-09-08T13:39:29.573Z").toDate(),
    "startTime": "9:39 PM",
    "duration": 25315,
    "durationText": "25s"
  },
  finished = {
    "position": "LEFT",
    "_id": "BciQaR3du86M2Fe7p",
    "started": moment("2016-09-08T13:39:29.573Z").toDate(),
    "ended": moment("2016-09-08T13:41:58.299Z").toDate(),
    "startTime": "9:39 PM",
    "endTime": "9:41 PM",
    "duration": 148318,
    "durationText": "2m, 28s"
  };

const calcDuration = (doc) => doc.sessions.map((s) => s.duration).filter(a => a).reduce((p,c) => p+c);

describe("Recording Collection", function () {
  before(() => Recordings.remove({}));
  it("should create a new document with recording as sub-document when `insertSession` is called", function () {
    Recordings.insertSession(session);
    let inserted = Recordings.findOne();
    assert.equal(inserted.sessions[0]._id, session._id, "Inserted recording subdocument id should equal the given recording id");
  });

  it("should throw an error when given a non valid session in `insertSession`", function(){
    assert.throws(() => {
      Recordings.insertSession(undefined);
    }, Error);
  });

  it("should throw an error when given a non valid session in `updateSession`", function(){
    assert.throws(() => {
      Recordings.updateSession(undefined);
    }, Error);
  });

  it("should throw an error when given a non valid session in `removeSession`", function(){
    assert.throws(() => {
      Recordings.removeSession(undefined);
    }, Error);
  });

  it("should update the same document when the recording has stopped", function () {
    Recordings.updateSession({_id: finished._id}, finished)
    let inserted = Recordings.findOne();
    assert(inserted.sessions.length, 1, "There should be only one recording subdocument");
    assert(inserted.counts.sessions, 1, "The recording count should reflect the total number of docs");
  });

  it("should store the total duration of one individual session", function(){
    let inserted = Recordings.findOne();
    assert(inserted.sessions[0].duration, inserted.duration, "A document's duration should equal that of it's only session");
  });

  it("should store the total duration of all session", function(){
    finished._id = Random.id();
    Recordings.insertSession(finished);
    let recording = Recordings.findOne();
    let total = calcDuration(recording);
    assert(recording.counts.duration, total, "A document's duration should equal that of all its sessions");
    assert(recording.counts.sessions, 2, "The recording count should reflect the total number of docs");
  });

  it("should store a new document even if an end time is not specified", function(){
    session._id = Random.id();
    Recordings.insertSession(session);
    let recording = Recordings.findOne();
    let total = calcDuration(recording);
    assert(recording.counts.duration, total, "A document's duration should equal that of all its sessions");
    assert(recording.counts.sessions, 3, "The recording count should reflect the total number of docs");
  });

  it("should remove a session from a document and reflect proper duration, counts and length", function(){
    Recordings.removeSession(finished);
    let recording = Recordings.findOne();
    let total = calcDuration(recording);

    assert(recording.counts.duration, total, "A document's duration should equal that of all its sessions");
    assert(recording.counts.sessions, 2, "The recording count should reflect the total number of docs");
    assert(recording.sessions.length, 2, "There should be only one recording subdocument");
  })

});
