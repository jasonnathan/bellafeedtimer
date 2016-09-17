/*global describe it before after*/
import moment from 'moment';
import expect from 'expect';
import {
  Random
} from 'meteor/random';
import {
  Recordings
} from './RecordingCollection.js';

const session = {
    "position": "LEFT",
    "_id": "BciQaR3du86M2Fe7p",
    "started": moment("2016-09-08T13:39:29.573Z")
      .toDate(),
    "startTime": "9:39 PM",
    "duration": 25315,
    "durationText": "25s"
  },
  finished = {
    "position": "LEFT",
    "_id": "BciQaR3du86M2Fe7p",
    "started": moment("2016-09-08T13:39:29.573Z")
      .toDate(),
    "ended": moment("2016-09-08T13:41:58.299Z")
      .toDate(),
    "startTime": "9:39 PM",
    "endTime": "9:41 PM",
    "duration": 148318,
    "durationText": "2m, 28s"
  };

const cleanUp = () => Recordings.remove({});

const calcDuration = (doc) => doc.sessions
  .map((s) => s.duration)
  .filter(a => a)
  .reduce((p, c) => p + c);

describe("Recording Collection", function () {
  before(cleanUp);
  after(cleanUp);
  it("should create a new document with recording as sub-document when `insertSession` is called", function () {
    Recordings.insertSession(session);
    const inserted = Recordings.findOne();
    expect(inserted.sessions[0]._id)
      .toEqual(session._id, "Inserted recording subdocument id should equal the given recording id");
  });

  it("should throw an error when given a non valid session in `insertSession`", function () {
    expect(() => Recordings.insertSession(undefined))
      .toThrow(Error, "Passing undefined to insertSession should throw an error.");
  });

  it("should throw an error when given a non valid session in `updateSession`", function () {
    expect(() => Recordings.updateSession(undefined))
      .toThrow(Error, "Passing undefined to updateSession should throw an error.");
  });

  it("should throw an error when given a non valid session in `removeSession`", function () {
    expect(() => Recordings.removeSession(undefined))
      .toThrow(Error, "Passing undefined to removeSession should throw an error.");
  });

  it("should update the same document when the recording has stopped", function () {
    Recordings.updateSession(finished);
    const inserted = Recordings.findOne();
    expect(inserted.sessions.length)
      .toEqual(1, "There should be only 1 recording subdocument");
    expect(inserted.counts.sessions)
      .toEqual(1, "The recording count should reflect 1 as the total number of docs");
  });

  it("should store the total duration of one individual session", function () {
    const inserted = Recordings.findOne();
    expect(inserted.sessions[0].duration)
      .toEqual(
        inserted.counts.duration,
        "The sessions's duration is: " + inserted.sessions[0].duration + "\nwhere the document's duration is: " + inserted.counts.duration);
  });

  it("should store the total duration and count of all sessions", function () {
    finished._id = Random.id();
    Recordings.insertSession(finished);
    const recording = Recordings.findOne();
    const total = calcDuration(recording);
    expect(recording.counts.duration)
      .toEqual(total, "The document's duration is: " + recording.counts.duration + "\n and the computed duration is: " + total);
    expect(recording.counts.sessions)
      .toEqual(2, "The document's session count is: " + recording.counts.sessions + "\n and the computed session length is: " + 2);
  });

  it("should store a new document even if an end time is not specified", function () {
    session._id = Random.id();
    Recordings.insertSession(session);
    const recording = Recordings.findOne();
    const total = calcDuration(recording);
    expect(recording.counts.duration)
      .toEqual(total, "A document's duration should equal that of all its sessions");
    expect(recording.counts.sessions)
      .toEqual(3, "The recording count should reflect the total number of docs");
  });

  it("should remove a session from a document and reflect proper duration, counts and length", function () {
    Recordings.removeSession(finished);
    const recording = Recordings.findOne();
    const total = calcDuration(recording);

    expect(recording.counts.duration)
      .toEqual(total, "A document's duration should equal that of all its sessions");
    expect(recording.counts.sessions)
      .toEqual(2, "The recording count should reflect the total number of docs");
    expect(recording.sessions.length)
      .toEqual(2, "There should be only one recording subdocument");
  })

});
