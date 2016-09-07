import Tracker from 'tracker-component';
import moment from "moment";
import React, { PropTypes } from 'react';
import { List, ListHeader } from 'react-onsenui';
import {Recordings, Session} from '../api/Session.js';

import RecordingDetailsPage from './RecordingDetailsPage.jsx';
import Recording from './Recording.jsx';

class ReactiveRecordings extends Tracker.Component {
  constructor(props){
    super(props);
    //this.subscribe('recordingsByUser')
    this.autorun(() => {
      this.setState({
        recordings: Recordings.find({}, { sort: { createdAt: -1 } }).fetch()
      });
    });
  }
}

const RecordingList = ({recordings= [], navigator}) => {
  const recordingClickHandler = index => {
    navigator.pushPage({
      component: RecordingDetailsPage,
      key: 'recording_DETAILS_PAGE',
      recording: recordings[index],
      props: {
        recording: recordings[index]
      }
    });
  };

  const renderRecording = (recording, index) => {
    return (
      <Recording key={recording._id} onClick={() => recordingClickHandler(index)} recording={recording} />
    );
  };

  return (
    <List
      dataSource={recordings}
      renderRow={renderRecording}
      renderHeader={() =>
        <ListHeader style={{color:'#444'}}>
          {incompleteCount}
        </ListHeader>
      }
    />
  );
};

RecordingList.propTypes = {
  recordings: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  navigator: PropTypes.object
};

let dtFormat = "[Today] - Do MMM (ddd)",
currentTime = new ReactiveVar(moment().format(dtFormat))
setInterval(() => {
  currentTime.set(moment().format(dtFormat))
}, 1e3);
