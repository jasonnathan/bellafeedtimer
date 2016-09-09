import {
  Mongo
} from 'meteor/mongo';
import _ from 'underscore';
import moment from 'moment';

export default class RecordingCollection extends Mongo.Collection {
  constructor(collectionName) {
    super(collectionName);
  }

  get Id() {
    return moment()
      .format('YYYYMMDD');
  }

  insertSession(session, callback) {
    if(typeof session !== 'object'){
      throw new Error("Session must be an object with a valid _id");
    }
    let existing = super.findOne(this.Id);
    if(existing){
      let query = {
        _id: this.Id
      }, modifier = {
        $set: {
        }
      };
      if(existing.sessions.length){
        if(_.findWhere(existing.sessions, {_id: session._id})){
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
        $inc:{
          'counts.duration': session.duration,
          'counts.sessions': 1
        }
      }, callback);
    }

    return super.insert({
      _id: this.Id,
      sessions: [session],
      counts:{
        duration: 0,
        sessions: 1
      }
    })
  }

  updateSession(selector, session, callback) {
    if(typeof session !== 'object'){
      throw new Error("Session must be an object with a valid _id");
    }
    return super.update({
      _id: this.Id,
      'sessions._id': session._id
    }, {
      $set: {
        'sessions.$': session
      },
      $inc: {
        'counts.duration': session.duration || 0
      }
    }, callback);
  }

  removeSession(session, callback) {
    if(typeof session !== 'object'){
      throw new Error("Session must be an object with a valid _id");
    }
    return this.update({
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
