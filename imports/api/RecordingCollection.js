import {
  Mongo
} from 'meteor/mongo'; // eslint-disable-line
import moment from 'moment';

export class RecordingCollection extends Mongo.Collection {
  constructor(collectionName: String) {
    super(collectionName);
  }

  get Id() {
    return moment().format('YYYYMMDD');
  }

  insertSession(session: Object = {}, callback: ?Function) {
    let existing = super.findOne(this.Id);
    if (existing) {
      let query = {
          _id: this.Id
        },
        modifier = {
          $set: {}
        };
      if (existing.sessions.length) {
        if ( existing.sessions.find( s => s._id === session._id) ) {
          query['sessions._id'] = session._id;
          modifier = {
            $set: {
              'sessions.$': session
            }
          }
          return super.update(query, modifier, callback);
        }
      }
      return super.update({
        _id: this.Id
      }, {
        $addToSet: {
          sessions: session
        },
        $inc: {
          'counts.duration': session.duration || 0,
          'counts.sessions': 1
        }
      }, callback);
    }

    return super.insert({
      _id: this.Id,
      sessions: [session],
      counts: {
        duration: 0,
        sessions: 1
      }
    });
  }

  updateSession(session: Object = {}, callback: ?Function) {
    if (typeof session !== 'object') {
      throw new Error("Session must be an object with a valid _id");
    }
    session.duration = session.duration && session.duration > 1e3 ? session.duration : 0;
    let update = {
        $set: {},
        $inc: {
          'counts.duration': session.duration
        }
      },
      k;
    for (k in session) {
      if (typeof session[k] !== "undefined") {
        update.$set['sessions.$.' + k] = session[k];
      }
    }

    return super.update({
      _id: session.dayId || this.Id,
      'sessions._id': session._id
    }, update, callback);
  }

  removeSession(session: Object = {}, callback: ?Function) {
    if (typeof session !== 'object' || !session.hasOwnProperty("_id")) {
      throw new Error("Session must be an object with a valid _id");
    }
    return super.update({
      _id: this.Id
    }, {
      $pull: {
        sessions: {
          _id: session._id
        }
      },
      $inc: {
        'counts.sessions': -1,
        'counts.duration': -(session.duration || 0)
      }
    }, callback);
  }
}

export const Recordings = new RecordingCollection('meteor');
