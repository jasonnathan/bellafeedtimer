import moment from 'moment';
import {updateInToday} from '/imports/client/Actions/currentDay';
import Store from '../client/Store';
import {Recordings} from './RecordingCollection';

const TodayObserver = Recordings
  .find({_id: moment().format('YYYYMMDD')})
  .observeChanges({
    changed: (id: String, fields: Object) => Store.dispatch(updateInToday(fields)),
  })

export default TodayObserver;
