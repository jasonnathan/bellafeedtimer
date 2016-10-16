import React, {PropTypes} from 'react';
import Tracker from 'tracker-component';
import {connect} from 'react-redux';
import {List} from 'react-onsenui';
import moment from 'moment';
import {TodayObserver} from '/imports/api/TodayObserver';
import {fetchTodayAsync} from '../Actions/currentDay';
import RecordingListHeader from './RecordingListHeader.jsx';
import Recording from './Recording.jsx';

class RecordingList extends Tracker.Component {
  constructor(props) {
    super(props);
    this._subs = [this.subscribe("fetchToday"), TodayObserver];
    // this.renderRecording = this.renderRecording.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchTodayAsync());
  }

  componentWillUnmount() {
    this._subs.map(s => s && s.stop());
  }

  renderRecording(row) {
    return (<Recording key={row._id} session={row} />);
  }

  get dataSource() {
    let sessions = this.props.sessions,
      currentSession = this.props.currentSession,
      found;
    // if we don't have an on-going recording or we do and there are no other sessions
    if (!currentSession.hasOwnProperty('started') || !sessions.length) {
      return sessions;
    }
    // we have to look to see if the current recording is already in the sessions
    // array
    found = sessions.find(s => s._id === currentSession._id);
    if (found) {
      // replace the current session
      sessions[sessions.indexOf(found)] = currentSession;
    } else {
      sessions = [ currentSession, ...sessions ];
    }
    return sessions;
  }

  render() {
    return (
      <List
        dataSource={this.dataSource}
        renderRow={this.renderRecording}
        renderHeader={() => (<RecordingListHeader />)}
      />
    );
  }
}

RecordingList.propTypes = {
  currentSession: PropTypes.object,
  currentDay: PropTypes.object,
  sessions: PropTypes.array,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
  let cd = state.currentDay;
  return {
    currentDay: cd,
    currentSession: state.currentSession,
    sessions: cd.sessions || []
  };
};

export default connect(mapStateToProps)(RecordingList);
