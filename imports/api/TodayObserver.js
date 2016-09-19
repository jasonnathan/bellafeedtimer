import moment from 'moment';
import Store from '../client/Store';
import {
  updateInToday
} from '/imports/client/Actions/currentDay';

import {
  Recordings
} from './RecordingCollection';

const TodayObserver = Recordings
  .find({
    _id: moment()
      .format('YYYYMMDD')
  })
  .observeChanges({
    changed: (id, fields) => Store.dispatch(updateInToday(fields)),
  })

export default TodayObserver;
