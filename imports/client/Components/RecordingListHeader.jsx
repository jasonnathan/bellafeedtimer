import React, {PropTypes} from 'react';
// import Tracker from 'tracker-component';
import {ListHeader, Row, Col} from 'react-onsenui';
import {connect} from 'react-redux';
import moment from 'moment';
import Humanize from '/imports/helpers/Humanize';

const RecordingListHeader = ({dateText, durationText, totalRecordings}) => {
  const center = {textAlign:'center'};
  return (
    <ListHeader className="black">
      <Row>
        <Col style={center}>{dateText}</Col>
        <Col style={center}>Total: {totalRecordings}</Col>
        <Col style={center}>Duration: {durationText}</Col>
      </Row>
    </ListHeader>
  )
}

RecordingListHeader.propTypes = {
  dateText: PropTypes.string,
  durationText: PropTypes.string,
  totalRecordings: PropTypes.number,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
  const cd = state.currentDay,
    cs = state.currentSession,
    currentDuration = cs.hasOwnProperty('duration') ? cs.duration : 0,
    isCurrentInSessions = currentDuration ? cd.sessions.find(s => s._id === cs._id) : null;

    let duration = cd.counts.duration;

    if(isCurrentInSessions && currentDuration !== isCurrentInSessions.duration){
        duration += currentDuration;
    }

  return {
    dateText: moment(cd._id, 'YYYYMMDD').format("ddd, MMM Do"),
    durationText: Humanize(duration),
    totalRecordings: cd.counts.sessions
  };
};

export default connect(mapStateToProps)(RecordingListHeader);
